# Image Vision - A REST API for Image Recognition

ImageVision is an API that utilizes the tensorflow-mobile-net computer vision model to identify objects and patterns in images. Make requests to this API with image(s) and get a response of all the identified objects with their respective confidence values [probability of successful recognition].
Checkout the fastify-dev branch to see my implementation with the fastify framework.

Here's the link to the API >> https://image-vision-api.onrender.com/ <<

                                                          
Sample usage of the API >> [here](https://github.com/Suei43/imagevison-fe) <<

Response caching and response time enhancement coming soon!

- Image recognition using TensorFlow.js and MobileNet model.
- Confidence threshold customization for object detection results.

## Installation

1. Clone the repository:

```
git clone https://github.com/Suei43/imagevision.git

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

1. Start the server:

```bash

npm run start

```

2. Make API requests:

Send a POST request to the `/api/image-recognition` endpoint with an image file in the request body. You can also customize the API by setting the confidence threshold and model selection options.

**Example:**

```bash
curl -X POST -F "image=@path/to/your/image.jpg" -F "confidenceThreshold=0.5" -F http://localhost:3000/api/image-recognition
```

## Available Endpoints
- **GET `/*` :** Welcome message/ Health Check 😁.
- **GET `/api/image-recognition` :** Get more information on how to use the image recognition feature.  
- **POST `/api/image-recognition` :** Perform image recognition on the provided image with optional customization parameters.
  - Request body:
    - image: The image file to be recognized.
    - confidenceThreshold (optional): The confidence threshold for object detection, between 0 and 1 (default: 0.1).
   
- **GET `/api/save` :** Get more information on how to use this endpoint to temporarily store images and files.
- **POST `/api/save` :** Temporarily save your files and images but sending them here.
- More Features coming soon!

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the <a href="https://opensource.org/license/mit/">MIT</a> license.
