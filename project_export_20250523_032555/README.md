# Fidget Key Shop

A modern, user-friendly e-commerce website for customizable fidget key options with a streamlined checkout process.

## Features

- Interactive product selection with visual previews
- Real-time customization with color options
- Live price updates based on selections
- Mobile-friendly responsive design
- Streamlined checkout process with lunch preference selection
- Apple-inspired dark theme aesthetic

## Technology Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Styling**: Bootstrap with custom CSS
- **Database**: PostgreSQL (setup ready)
- **Icons**: Font Awesome integration

## Project Structure

- `app.py` - Main Flask application with routes and business logic
- `main.py` - Entry point for the application
- `static/` - Frontend assets
  - `css/` - Stylesheets including custom CSS
  - `js/` - JavaScript files for interactivity
- `templates/` - HTML templates using Jinja2
  - `layout.html` - Base template with common elements
  - `index.html` - Product selection and customization page
  - `confirmation.html` - Order confirmation page

## Getting Started

### Prerequisites

- Python 3.7 or higher
- pip (Python package manager)

### Installation

1. Clone this repository:
```bash
git clone https://github.com/your-username/fidget-key-shop.git
cd fidget-key-shop
```

2. Install the required dependencies:
```bash
pip install flask flask-sqlalchemy gunicorn psycopg2-binary sendgrid email-validator
```

3. Set up environment variables:
```bash
export FLASK_APP=app.py
export FLASK_ENV=development
export SESSION_SECRET=your_secret_key
```

4. Run the application:
```bash
flask run
```

5. Access the application at `http://localhost:5000`

## Customizing Products

The product catalog can be modified in the `app.py` file by updating the `key_data` dictionary:

```python
key_data = {
    "1x1": "0.50",
    "2x1": "1.00",
    # Add or modify products here
}
```

Color options can be adjusted by modifying the `color_options` list:

```python
color_options = [
    "#0066CC",  # Apple Blue
    "#E30000",  # Apple Red
    # Add or modify colors here
]
```

## Future Enhancements

- User accounts and authentication
- Order history tracking
- Expanded product catalog
- Shipping calculation
- Multiple payment options
- Admin dashboard for inventory management

## License

This project is licensed under the MIT License - see the LICENSE file for details.