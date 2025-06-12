# Financial Prediction Form

A modern React-based financial prediction form that integrates with Django ML backends. This application provides a clean, user-friendly interface for collecting age and salary data and displaying ML-powered financial predictions.

## Features

- **Modern UI**: Clean two-column layout with professional styling
- **Form Validation**: Client-side validation for age (1-100) and salary inputs
- **Django Integration**: Ready to connect with Django ML backends
- **Real-time Feedback**: Loading states, error handling, and success notifications
- **Responsive Design**: Works on desktop and mobile devices
- **API Configuration**: Configurable Django backend endpoint

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Radix UI primitives with shadcn/ui
- **Form Handling**: React Hook Form with Zod validation
- **API Integration**: TanStack Query for data fetching
- **Backend Proxy**: Express.js server for API forwarding

## Quick Start

### Prerequisites

- Node.js 20 or higher
- A Django backend with ML prediction endpoint

### Installation

1. Extract the project files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5000`

### Django Backend Setup

Your Django backend should expose a POST endpoint at `/api/predict` that:

**Accepts:**
```json
{
  "age": 25,
  "salary": 50000
}
```

**Returns:**
```json
{
  "prediction": "Most likely will not Purchase"
}
```

### Configuration

By default, the form connects to `http://django:8000/api/predict`. You can:

1. Change the default URL in `client/src/pages/home.tsx`
2. Use the API Configuration section in the form to set a custom endpoint
3. Set the `DJANGO_API_URL` environment variable on the server

## Project Structure

```
├── client/                 # React frontend
│   └── src/
│       ├── components/     # UI components
│       ├── pages/         # Application pages
│       ├── lib/           # Utilities and API client
│       └── hooks/         # Custom React hooks
├── server/                # Express.js backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage interface
├── shared/               # Shared types and schemas
│   └── schema.ts        # Zod validation schemas
└── package.json         # Dependencies and scripts
```

## API Integration

The Express server acts as a proxy, forwarding requests to your Django backend with proper error handling:

- **Endpoint**: `POST /api/predict`
- **Validation**: Input validation using Zod schemas  
- **Error Handling**: Comprehensive error messages for connection and API issues
- **CORS**: Configured for cross-origin requests

## Customization

### Styling
- Colors and themes are defined in `client/src/index.css`
- Uses Tailwind CSS utility classes
- Custom color palette for financial data visualization

### Form Fields
- Age validation: 1-100 years (configurable in `shared/schema.ts`)
- Salary validation: Must be greater than 0
- Both fields support numeric input with proper formatting

### Response Display
The results section automatically formats and displays:
- Financial score with description
- Investment recommendations
- Retirement timeline
- Key insights list

## Development

### Adding New Fields
1. Update the schema in `shared/schema.ts`
2. Add form fields in `client/src/pages/home.tsx`
3. Update the Django backend to handle new fields

### Modifying Validation
Edit the `predictionSchema` in `shared/schema.ts` to change validation rules.

### Styling Changes
Modify `client/src/index.css` for global styles or update component classes for specific styling.

## Deployment

### Frontend Only
If you only need the frontend form:
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your web server
3. Update API endpoints to point to your Django backend

### Full Stack
The Express server can be deployed to any Node.js hosting platform:
1. Set `DJANGO_API_URL` environment variable
2. Deploy with `npm start`
3. Configure your reverse proxy if needed

## Support

For issues or questions about integrating with your Django ML backend, check:
1. Network connectivity to your Django server
2. CORS configuration on Django side
3. API endpoint URL configuration
4. Request/response format matching

## License

This project is provided as-is for integration with your Django ML application.