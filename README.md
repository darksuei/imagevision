# Image Vision - A REST API for Image Recognition

ImageVision is an API that utilizes a tensorflowjs image recognition model to identify objects in images. Make requests to this API with image(s) and get a response of all the identified objects with their respective confidence values [probability of successful recognition].

Here's the link to the API >> https://image-vision-api.onrender.com/ <<

                                                          
Sample usage of the API >> [here](https://github.com/Suei43/imagevison-fe) <<

Response caching, temporary image storage and response time enhancement coming soon!

- Image recognition using TensorFlow.js and MobileNet model.
- Confidence threshold customization for object detection results.
- Model selection option to choose specific image recognition models(in progress).

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

3. Start the server:

```bash

npm run start

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
- **GET `/api` :** Welcome message/ Health Check 😁.

- **POST `/api/image-recognition` :** Perform image recognition on the provided image with optional customization parameters.
  - Request body:
    - image: The image file to be recognized.
    - confidenceThreshold (optional): The confidence threshold for object detection, between 0 and 1 (default: 0.1).
    - model (optional): The specific model to be used for image recognition (default: TFJS MobileNet).

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the <a href="https://opensource.org/license/mit/">MIT</a> license.
