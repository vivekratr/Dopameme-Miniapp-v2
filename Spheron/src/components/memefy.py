import requests
import google.generativeai as genai  


def understand(prompt, animate=False, normal=False, photo=False):
    try:
        genai.configure(api_key="AIzaSyBa5b8ZuK83ehPi52ua4Ly724ofJHTT5Zk")
        model = genai.GenerativeModel("gemini-pro")

        def generate_caption(prompt_text):
            max_attempts = 8
            response = None
            for _ in range(max_attempts):
                try:
                    response = model.generate_content(prompt_text)
                    response_text = response.text.strip().split('\n')
                    response_text = [item for item in response_text if item]

                    image_description = response_text[0].replace("**image_description:**", "").strip().lower()
                    top_text = response_text[1] if len(response_text) > 1 else ""
                    top_text = top_text.replace("**top_text:**", "")
                    bottom_text = response_text[2] if len(response_text) > 2 else ""
                    bottom_text = str(bottom_text).replace("**bottom_text:**", "").replace("**Bottom text:**", "").replace("\\", "")
                    
                    return image_description, top_text, bottom_text
           
                except Exception as e:
                    pass  # Retry on exception

            raise Exception(f"Failed to generate content after {max_attempts} attempts.")
            
        if normal or animate:
            prompt_text = (f"Based on the prompt: '{prompt}', generate suitable image description, top text and bottom text for the image meme."
                           " Make sure the answer includes the key name as **image_description:**,**top_text**, **bottom_text:** key should same as given above and is as funny as possible.")
            image_des, top_t, bottom_t = generate_caption(prompt_text)
            
            return image_des, top_t, bottom_t

    except Exception as e:
        return "Error: Please try again!"