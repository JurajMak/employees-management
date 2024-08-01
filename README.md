# Employee Management App

## Overview

The Employee Management App is a web application designed to manage and display employee information.

- A table displaying employee data with infinite scroll.

- A modal for viewing detailed information about employees.

- An organizational chart that visualizes the hierarchy of all employees.

## Features

### Employee Table

- **Infinite Scroll**: The table displays employee data in a scrollable list. New data is loaded as the user scrolls down, optimizing performance and improving user experience.

- **Row Details**: Each row includes a button that, when clicked, opens a modal showing detailed information about the employee.

### Organization Chart

- **Hierarchical View**: A dedicated page presents an organizational chart that visualizes the reporting structure and hierarchy of employees within the organization.

## Initialization

**Clone the Repository**

Clone the repository from GitHub to your local machine using the following command:

```bash

git  clone  https://github.com/JurajMak/employees-management.git

```

Load the Docker Image

```bash

docker  load  --input  {file-path}

```

Start the Docker Container

```bash

docker  run  -p  8000:8000  {image-id}

```

Use yarn to install required modules and packages.

```bash

yarn

```

Run the app using

```bash

yarn  start

```
