# Driving license Management System

## Overview

A modern web application for managing driver's license information with features like data entry, search, and record management.

## Technologies Used

- React
- TypeScript
- Vite
- TanStack React Table
- Tailwind CSS
- pnpm (Package Manager)
- Docker

## Prerequisites

- Node.js v22.4.1
- pnpm
- Docker (optional)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/driver-license-management.git
cd driver-license-management
```

### Installation

```bash
# Install dependencies
pnpm install
```

### Running the Application

```bash
# Development mode
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Docker Deployment

```bash
# Build Docker image
docker build -t driver-license-management .

# Run Docker container
docker run -p 3333:3333 driver-license-management
```

## Features

- Generate and manage driving license records
- Search and filter records
- Delete individual or all records
- Responsive design
- Local storage persistence

## Project Structure

- `src/`: Source code
  - `components/`: React components
  - `utils/`: Utility functions and data
  - `lib/`: Shared libraries and helpers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
