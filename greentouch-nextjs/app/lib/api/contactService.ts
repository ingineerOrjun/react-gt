import apiClient from './client';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

/**
 * Submits the contact form data to the API
 */
export async function submitContactForm(formData: ContactFormData): Promise<ApiResponse> {
  try {
    // For development purposes, simulate a successful API call
    if (process.env.NODE_ENV === 'development') {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        success: true,
        message: 'Thank you for your message. We will get back to you shortly.',
      };
    }
    
    // In production, make the actual API call
    const response = await apiClient.post('/contact', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      message: 'Failed to submit the form. Please try again later.',
    };
  }
}

export const getContactSubmissions = async (params?: {
  page?: number;
  limit?: number;
  status?: 'new' | 'read' | 'responded' | 'archived';
}): Promise<{
  submissions: Array<ContactFormData & { id: string; createdAt: string; status: string }>;
  total: number;
  pages: number;
}> => {
  const response = await apiClient.get('/admin/contact-submissions', { params });
  return response.data;
};

export const updateSubmissionStatus = async (
  id: string,
  status: 'read' | 'responded' | 'archived'
): Promise<{ success: boolean }> => {
  const response = await apiClient.put(`/admin/contact-submissions/${id}`, { status });
  return response.data;
};

export const deleteSubmission = async (id: string): Promise<void> => {
  await apiClient.delete(`/admin/contact-submissions/${id}`);
}; 