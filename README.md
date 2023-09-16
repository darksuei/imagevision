## Image Vision - API for Image Recognition

Image vision is a restful API that utilizes the tensorflow mobile-net computer vision model to identify objects and patterns in images. Make requests to this API with image(s) and get a response with the identified objects with their respective confidence scores [in plain terms, how confident the model is of success].

Checkout the fastify-dev branch to see the implementation with the fastify framework.

Wanna try it out? >> https://image-vision-api.onrender.com/ <<

                                                          
Minimalistic sample usage of the API >> [HERE](https://github.com/Suei43/imagevison-fe) <<

Response caching and response time enhancement coming soon!

- Image recognition using TensorFlow.js and MobileNet model.
- Confidence threshold customization for object detection result fine-tuning.

## Installation

1. Clone the repository:

```
git clone https://github.com/darksuei/imagevision.git

cd imagevision
```

2. Install the dependencies:

```
npm install
```

3. Start the server in development mode:

```bash
npm run dev

```

## Usage

1. Grab an API KEY, make a GET request to `https://image-vision-api.onrender.com/api/auth` for specific details.

2. Make API requests:

Send a POST request to the `/api/image-recognition` endpoint with an image in the request body. You can also customize the API by setting the confidence threshold in the request body.

**Example:**

```bash
curl -X POST -F "image=@path/to/your/image.jpg" -F "confidenceThreshold=0.5" -F https://image-vision-api.onrender.com/api/image-recognition
```

## Available Endpoints
- **GET `*` :** Welcome message/ Health Check 👏.
- **GET `/api/auth` :** Get more information on how to acquire an API KEY.
- **POST `/api/auth` :** Grab your API KEY by making a request with your email and preferred password.
- **GET `/api/image-recognition` :** Get more information on how to use the image recognition endpoint.  
- **POST `/api/image-recognition` :** Perform image recognition on the provided image with optional customization parameters.
  - Request body:
    - image: The image file to be recognized.
    - confidenceThreshold (optional): The confidence threshold for object detection, between 0 and 1 (default: 0.1).
   
- **GET `/api/save` :** Get more information on how to use this endpoint to *temporarily* store images and files.
- **POST `/api/save` :** Temporarily save your files and images.
- This readme would be updated with the latest features!!

## Contributing

Contributions from the community are welcome! If you find any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the <a href="https://opensource.org/license/mit/">MIT</a> license.
