import cv2
from publitio import PublitioAPI
import os

working_dir = os.getcwd()

GEN_KEY = "AIzaSyCEDJ1aaSEGimwoSgF-bSNY2PP4i-j4_Kc"
# GEN_KEY = "AIzaSyBa5b8ZuK83ehPi52ua4Ly724ofJHTT5Zk"
api_key = 'jP6avoTuQW3LhlQN6fkR'
api_secret = 'zQz5nJtbbNLJliVe5gLq8zVwfiRQvBLB'

current_directory = os.getcwd()
INPUT = os.path.join(current_directory, "artifacts", "Input.jpg")
OUTPUT = os.path.join(current_directory, "artifacts", "output.jpg")
FONT = os.path.join(current_directory, "artifacts", "impact.ttf")



publitio_api = PublitioAPI(key=api_key , secret=api_secret)

def savenft(path):
    
    from imgurpython import ImgurClient

    # Replace these with your Imgur client ID and secret
    # client_id = '7f25a5359417cee'
    # client_id = "3e33f272860472d"
    # # client_secret = '7f25a5359417cee'
    # client_secret = '0fe0243f351ff6779ca2bbbc71254f70e8a4b221'

    # # Create an ImgurClient instance
    # client = ImgurClient(client_id, client_secret)

    # # Upload the image
    # response = client.upload_from_path(path, anon=True)

    # # Get the link to the uploaded image
    # image_link = response['link']
    # print(f"Image uploaded successfully. Link: {image_link}")
    # return image_link, image_link
    
    # print(f"Image uploaded successfully. Link: {image_link}")
    data = publitio_api.create_file(file=open(path, 'rb'),
                            title='My title',
                            description='My description')
            
    return data['url_preview'], data["url_download"]





