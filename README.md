# JCapture - Frontend and Backend
JCapture is a full-stack web application inspired by Instagram, built using React, Tailwind, Apollo Client, Apollo Server Express, MongoDB, Node.js, and GraphQL.

# Live Demo

The application is hosted at [jcapture.azurewebsites.net](http://jcapture.azurewebsites.net).

## Features

JCapture offers a range of features similar to Instagram, including:

- Users can upload posts and images.
- Users can like and comment on posts.
- Users can follow other users.

The application was meticulously crafted by customizing and building over 15+ GraphQL APIs on top of an existing frontend boilerplate code. This resulted in a highly refined and tailored solution that perfectly aligns with the project's specific needs. The primary focus of this project was to enhance the backend for an existing frontend project. I also made necessary adjustments to the frontend to seamlessly integrate with the backend code I developed.

## Hosting

JCapture is hosted on Azure App Service and utilizes Azure App service and Azure DevOps CI/CD pipeline with code artifact for seamless delivery of updates and new features, resulting in faster time-to-market.

## Folder Architecture

The project is divided into two main parts:

- **photo-sharing-frontend**: This is a React JS based project with Apollo client to integrate with the backend. It is hosted on Azure with app service and Azure DevOps.

- **photo-sharing-backend**: This is a modified Node.js, Apollo Server Express, GraphQL based backend with MongoDB database. It is hosted on Azure app service utilizing Azure DevOps CI/CD pipeline.

## Getting Started

To get started with JCapture, clone the repository and install the dependencies in both the frontend and backend directories. Then, start the frontend and backend servers. Please refer to the individual README files in the frontend and backend directories for detailed instructions.

## Contributing

Contributions to JCapture are welcome! Please read the contributing guidelines before making any changes.

## License

JCapture is licensed under the MIT License. See the LICENSE file for more details.



