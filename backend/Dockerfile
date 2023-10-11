# Use the official Python image
FROM python:3.8

# Set the working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt
RUN pip install pipdeptree

# Copy the local source code to the container
COPY ./ /app

# Expose the application's port
EXPOSE 8000

# Start the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
