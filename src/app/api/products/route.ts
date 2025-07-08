import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function POST(request: NextRequest) {
  try {
    console.log('📤 Creating product, forwarding to backend...');
    
    // Get the raw form data from the request
    const formData = await request.formData();
    
    // Log what we're sending
    console.log('📋 FormData contents:');
    for (const [key, value] of formData.entries()) {
      console.log(`  ${key}:`, value);
    }
    
    // Get token from Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Authorization token required' },
        { status: 401 }
      );
    }

    // Forward the exact FormData to your backend
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': authHeader,
      },
    });

    console.log('📊 Backend response status:', response.status);
    
    const result = await response.json();
    console.log('📦 Create product response:', result);

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: result.message || 'Failed to create product' },
        { status: response.status }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('💥 POST Products API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.toString();
    
    const response = await fetch(`${API_URL}/products${query ? `?${query}` : ''}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: result.message || 'Failed to fetch products' },
        { status: response.status }
      );
    }

    if (Array.isArray(result)) {
      return NextResponse.json({
        success: true,
        data: result,
      });
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('💥 GET Products API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}