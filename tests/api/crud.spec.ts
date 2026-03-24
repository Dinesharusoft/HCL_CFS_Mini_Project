import { test, expect } from '@playwright/test';
import { request } from '@playwright/test';

test.describe('API Automation - Petstore CRUD Operations', () => {
  let apiContext: any;
  let petId: number;
  let createdPetData: any;
  let updatedPetData: any;
  const baseUrl = 'https://petstore.swagger.io/v2';

  test.beforeAll(async () => {
    apiContext = await request.newContext();
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('Create a Resource - POST /pet', async () => {
    // Generate dynamically generated test data
    const timestamp = Date.now();
    const newPet = {
      id: timestamp,
      name: `TestPet_${timestamp}`,
      category: {
        id: 1,
        name: 'Dogs'
      },
      photoUrls: ['https://example.com/photo1.jpg'],
      tags: [
        {
          id: 1,
          name: 'tag1'
        }
      ],
      status: 'available'
    };

    // Send POST request to create a new pet
    const response = await apiContext.post(`${baseUrl}/pet`, {
      data: newPet,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Assert the response is successful
    expect(response.status()).toBe(200);
    
    createdPetData = await response.json();
    expect(createdPetData.id).toBe(newPet.id);
    expect(createdPetData.name).toBe(newPet.name);
    expect(createdPetData.status).toBe(newPet.status);
    expect(createdPetData.category.name).toBe(newPet.category.name);
    expect(createdPetData.photoUrls).toEqual(newPet.photoUrls);
    expect(createdPetData.tags).toEqual(newPet.tags);

    // Store the pet ID for subsequent tests
    petId = createdPetData.id;

    console.log(`Pet created successfully with ID: ${petId}`);
  });

  test('Read and Verify - GET /pet/{petId}', async () => {
    // Ensure we have a pet ID from the previous test
    expect(petId).toBeDefined();
    expect(petId).toBeGreaterThan(0);

    // Retrieve the pet by its ID
    const response = await apiContext.get(`${baseUrl}/pet/${petId}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    // Assert the response is successful
    expect(response.status()).toBe(200);
    
    const petData = await response.json();
    
    // Assert the response contains the expected data using stored createdPetData
    expect(petData.id).toBe(createdPetData.id);
    expect(petData.name).toBe(createdPetData.name);
    expect(petData.status).toBe(createdPetData.status);
    expect(petData.category.name).toBe(createdPetData.category.name);
    expect(petData.category.id).toBe(createdPetData.category.id);
    expect(petData.photoUrls).toEqual(createdPetData.photoUrls);
    expect(petData.tags).toEqual(createdPetData.tags);

    console.log(`Pet retrieved successfully: ID=${petData.id}, Name=${petData.name}, Status=${petData.status}`);
  });

  test('Update a Resource - PUT /pet', async () => {
    // Ensure we have a pet ID from the previous test
    expect(petId).toBeDefined();
    expect(petId).toBeGreaterThan(0);

    // Update the pet data
    const updatedPet = {
      id: petId,
      name: `UpdatedPet_${petId}`,
      category: {
        id: 1,
        name: 'Cats' // Changed category
      },
      photoUrls: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'],
      tags: [
        {
          id: 1,
          name: 'updated_tag'
        },
        {
          id: 2,
          name: 'new_tag'
        }
      ],
      status: 'sold' // Changed status
    };

    // Send PUT request to update the pet
    const response = await apiContext.put(`${baseUrl}/pet`, {
      data: updatedPet,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Assert the response is successful
    expect(response.status()).toBe(200);
    
    updatedPetData = await response.json();
    
    // Assert the response reflects the updated value using stored updatedPet
    expect(updatedPetData.id).toBe(updatedPet.id);
    expect(updatedPetData.name).toBe(updatedPet.name);
    expect(updatedPetData.status).toBe(updatedPet.status);
    expect(updatedPetData.category.name).toBe(updatedPet.category.name);
    expect(updatedPetData.category.id).toBe(updatedPet.category.id);
    expect(updatedPetData.photoUrls).toEqual(updatedPet.photoUrls);
    expect(updatedPetData.tags).toEqual(updatedPet.tags);

    console.log(`Pet updated successfully: Name=${updatedPetData.name}, Status=${updatedPetData.status}, Category=${updatedPetData.category.name}`);
  });

  test('Verify pet update with GET request', async () => {
    // Retrieve the updated pet to verify changes
    const response = await apiContext.get(`${baseUrl}/pet/${petId}`, {
      headers: { 'Accept': 'application/json' }
    });

    expect(response.status()).toBe(200);
    const petData = await response.json();

    // Verify the updates are persisted using stored updatedPetData
    expect(petData.id).toBe(updatedPetData.id);
    expect(petData.name).toBe(updatedPetData.name);
    expect(petData.status).toBe(updatedPetData.status);
    expect(petData.category.name).toBe(updatedPetData.category.name);
    expect(petData.category.id).toBe(updatedPetData.category.id);
    expect(petData.photoUrls).toEqual(updatedPetData.photoUrls);
    expect(petData.tags).toEqual(updatedPetData.tags);

    console.log('Pet update verification completed successfully');
  });

  test('Delete and Confirm - DELETE /pet/{petId}', async () => {
    // Ensure we have a pet ID from the previous test
    expect(petId).toBeDefined();
    expect(petId).toBeGreaterThan(0);

    // Delete the pet
    const deleteResponse = await apiContext.delete(`${baseUrl}/pet/${petId}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    // Assert the delete response is successful
    expect(deleteResponse.status()).toBe(200);

    console.log(`Pet deleted successfully with ID: ${petId}`);
  });

  test('Verify pet is no longer retrievable', async () => {
    // Verify the pet is no longer retrievable
    const getResponse = await apiContext.get(`${baseUrl}/pet/${petId}`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    // Assert that a subsequent GET request returns an appropriate error or not-found response
    expect(getResponse.status()).toBe(404);

    console.log(`Verified pet ${petId} is no longer retrievable (404 response)`);
  });

  test('Attempt to delete non-existent pet', async () => {
    // Try to delete a pet that doesn't exist
    const nonExistentId = 999999999;
    const deleteResponse = await apiContext.delete(`${baseUrl}/pet/${nonExistentId}`, {
      headers: { 'Accept': 'application/json' }
    });

    // Should return 404 for non-existent pet
    expect(deleteResponse.status()).toBe(404);

    console.log(`Correctly received 404 when attempting to delete non-existent pet ID: ${nonExistentId}`);
  });
});
