from PIL import Image
import requests
import io
from PIL import Image, ImageFont, ImageDraw
from src.components.memefy import understand
import cv2
from src.utils import savenft
import src.utils as utils
import cv2
import google.generativeai as genai
import numpy as np
from diffusers import DiffusionPipeline
import torch



# Check if CUDA (GPU) is available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

pipeline = DiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0").to(device)

# Load additional LoRA weights
pipeline.load_lora_weights("Artples/LAI-ImageGeneration-vSDXL-2")


class GenPhoto:
    def __init__(self):
        pass

    def genimg(self, prompt, animate=False, normal=False, photo=False):
        try:
    
            # Assuming `understand` is defined somewhere
            result = understand(prompt, animate, normal, photo)
            

            if len(result) == 3:
                image_des, top_text, bottom_text = result
            else:
                return "Error while generating meme, please check prompt details!"

            result = pipeline(prompt)

            image = result.images[0]
            
            image.save(utils.INPUT)
            image.save(utils.OUTPUT)
            image.close()
    
            return top_text, bottom_text
    
        except Exception as e:
            return "Error while generating meme, please try again."
        
    def drawimage(self, top_text, bottom_text, photo=False, normal=False, prompt=" "):
        if photo:
            top_text, bottom_text = understand(prompt=prompt, photo=True)

        def load_meme_template(template_path):
            img = cv2.imread(template_path)
            if img is None:
                raise FileNotFoundError(f"Image not found at {template_path}")
            return img        
        def add_text_to_image(img, top_text, bottom_text, font_path, font_size=45):
            image_pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
            draw = ImageDraw.Draw(image_pil)
            font = ImageFont.truetype(font_path, font_size)

            def wrap_text(text, font, max_width):
                words = text.split()
                lines = []
                while words:
                    line = ''
                    while words and draw.textbbox((0, 0), line + words[0], font=font)[2] <= max_width:
                        line = line + (words.pop(0) + ' ')
                    lines.append(line.strip())
                return lines

            image_width, image_height = image_pil.size
            max_text_width = image_width - 20

            wrapped_top_text = wrap_text(top_text, font, max_text_width)
            wrapped_bottom_text = wrap_text(bottom_text, font, max_text_width)

            y_offset = 10
            shadow_offset = 2

            for line in wrapped_top_text:
                text_bbox = draw.textbbox((0, 0), line, font=font)
                text_width = text_bbox[2] - text_bbox[0]
                text_height = text_bbox[3] - text_bbox[1]
                text_x = (image_width - text_width) // 2
                text_y = y_offset

                draw.text((text_x + shadow_offset, text_y + shadow_offset), line, font=font, fill=(0, 0, 0))
                draw.text((text_x, text_y), line, font=font, fill=(255, 255, 255))

                y_offset += text_height + 10

            y_offset = image_height - 10
            for line in reversed(wrapped_bottom_text):
                text_bbox = draw.textbbox((0, 0), line, font=font)
                text_width = text_bbox[2] - text_bbox[0]
                text_height = text_bbox[3] - text_bbox[1]
                text_x = (image_width - text_width) // 2
                text_y = y_offset - text_height

                draw.text((text_x + shadow_offset, text_y + shadow_offset), line, font=font, fill=(0, 0, 0))
                draw.text((text_x, text_y), line, font=font, fill=(255, 255, 255))

                y_offset -= text_height + 10

            img = cv2.cvtColor(np.array(image_pil), cv2.COLOR_RGB2BGR)
            cv2.imwrite(utils.OUTPUT, img)
            return savenft(utils.OUTPUT)

        meme = load_meme_template(utils.INPUT)
        return add_text_to_image(meme, top_text, bottom_text, utils.FONT)


