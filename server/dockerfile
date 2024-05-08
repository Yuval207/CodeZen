# Use an official Python runtime as a base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /code

# Copy the Python files into the container at /app
COPY solution/* /code

# Install any needed dependencies specified in requirements.txt
# If you have any requirements, uncomment the line below and place your requirements.txt file in the same directory as the Dockerfile
# COPY requirements.txt /app
# RUN pip install --no-cache-dir -r requirements.txt

# Run two_sum_test.py when the container launches
WORKDIR /code
CMD ["python", "solution_test.py"]
