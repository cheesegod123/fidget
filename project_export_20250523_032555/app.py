import os
from flask import Flask, render_template, request, flash, redirect, url_for
import json

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-key")

# Data dictionary for keys and their values
key_data = {
    "1x1": "0.50",
    "2x1": "1.00",
    "3x1": "1.50",
    "Gen 1 WASD": "2.00",
    "Gen 2 WASD": "2.25",
    "2x2": "2.00",
    "3x2": "4.00",
    "3x3": "7.00",
    "4x4": "10.00"
}

# Available colors for customization (limited to 4 Apple-like options)
color_options = [
    "#0066CC",  # Apple Blue
    "#E30000",  # Apple Red
    "#000000",  # Black
    "#FFFFFF"   # White
]

@app.route("/", methods=["GET", "POST"])
def index():
    selected_key = None
    value = None
    base_color = "#0066CC"  # Default to Apple Blue
    top_color = "#FFFFFF"   # Default to White
    warranty = False
    total_price = 0
    
    if request.method == "POST":
        selected_key = request.form.get("key")
        base_color = request.form.get("base_color", base_color)
        top_color = request.form.get("top_color", top_color)
        warranty = "warranty" in request.form
        
        if selected_key:
            base_price = float(key_data.get(selected_key, 0))
            color_customization = 0.50  # 50 cents extra for color customization
            warranty_cost = 1.00 if warranty else 0  # $1 for warranty
            
            total_price = base_price + color_customization + warranty_cost
            value = "{:.2f}".format(total_price)
            
    return render_template("index.html", 
                          key_data=key_data,
                          color_options=color_options, 
                          selected_key=selected_key,
                          base_color=base_color,
                          top_color=top_color,
                          warranty=warranty, 
                          value=value)

@app.route("/checkout", methods=["POST"])
def checkout():
    if request.method == "POST":
        # Get order details
        product_key = request.form.get("product_key")
        base_color = request.form.get("base_color")
        top_color = request.form.get("top_color")
        warranty = request.form.get("warranty")
        
        # Always use the price from key_data for the selected product
        total_price = "1.00"  # Default fallback
        if product_key in key_data:
            total_price = key_data[product_key]
        
        # Get customer information
        first_name = request.form.get("first_name")
        last_name = request.form.get("last_name")
        lunch = request.form.get("lunch")
        email = request.form.get("email")
        
        # Normally, this would process payment and save the order to a database
        # For this demo, we'll just display a confirmation page
        
        return render_template("confirmation.html",
                              product_key=product_key,
                              base_color=base_color,
                              top_color=top_color,
                              warranty=warranty,
                              total_price=total_price,
                              first_name=first_name,
                              last_name=last_name,
                              lunch=lunch,
                              email=email)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
