// Main JavaScript for fidget.com static site

// Define key data (the products that were previously in app.py)
const keyData = {
    "1x1": "0.50",
    "2x1": "1.00",
    "3x1": "1.50",
    "Gen 1 WASD": "2.00",
    "Gen 2 WASD": "2.25",
    "2x2": "2.00",
    "3x2": "4.00",
    "3x3": "7.00",
    "4x4": "10.00"
};

// Available colors for customization
const colorOptions = [
    "#0066CC",  // Apple Blue
    "#E30000",  // Apple Red
    "#000000",  // Black
    "#FFFFFF"   // White
];

document.addEventListener('DOMContentLoaded', function() {
    // Generate key options on page load
    const keyOptionsContainer = document.getElementById('keyOptions');
    
    if (keyOptionsContainer) {
        Object.entries(keyData).forEach(([key, price]) => {
            const keyOption = document.createElement('div');
            keyOption.className = 'col-lg-4 col-md-6';
            keyOption.innerHTML = `
                <div class="key-option">
                    <input type="radio" class="btn-check" name="key" id="${key.replace(' ', '_')}" value="${key}">
                    <label class="btn btn-outline-primary w-100 h-100 d-flex flex-column key-label" for="${key.replace(' ', '_')}">
                        <span class="key-name">${key}</span>
                        <span class="key-price">$${price}</span>
                        <div class="key-image mt-2 mb-2">
                            ${getKeySvg(key)}
                        </div>
                        <span class="key-icon">
                            ${key.includes('WASD') ? '<i class="fas fa-gamepad"></i>' : '<i class="fas fa-keyboard"></i>'}
                        </span>
                    </label>
                </div>
            `;
            keyOptionsContainer.appendChild(keyOption);
        });
    }
    
    // Add hover effects for key options
    const keyLabels = document.querySelectorAll('.key-label');
    
    keyLabels.forEach(label => {
        label.addEventListener('mouseenter', function() {
            this.querySelector('.key-icon').style.transform = 'scale(1.2)';
        });
        
        label.addEventListener('mouseleave', function() {
            this.querySelector('.key-icon').style.transform = 'scale(1)';
        });
    });

    // Add smooth transition to all interactive elements
    document.querySelectorAll('button, .btn, .key-label').forEach(el => {
        el.style.transition = 'all 0.3s ease';
    });
    
    // Handle key selection form submission
    const keyForm = document.getElementById('keyForm');
    if (keyForm) {
        keyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const selectedRadio = document.querySelector('input[name="key"]:checked');
            
            if (selectedRadio) {
                const selectedKey = selectedRadio.value;
                document.getElementById('selectedKeyText').innerText = selectedKey;
                document.getElementById('selectedKey').value = selectedKey;
                document.getElementById('selectionResult').style.display = 'block';
                
                // Scroll to selection
                setTimeout(() => {
                    document.getElementById('selectionResult').scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
                
                // Update preview
                updateKeyPreview();
                calculatePrice();
            }
        });
    }
    
    // Handle color customization
    const baseColorSelect = document.getElementById('baseColor');
    const topColorSelect = document.getElementById('topColor');
    const baseColorPreview = document.getElementById('baseColorPreview');
    const topColorPreview = document.getElementById('topColorPreview');
    
    // Keep track of color changes - start with default colors
    const defaultBaseColor = "#0066CC";
    const defaultTopColor = "#FFFFFF";
    let hasChangedBaseColor = false;
    let hasChangedTopColor = false;
    
    // Update all SVG key base elements with the selected color
    function updateBaseColor(color) {
        if (baseColorPreview) baseColorPreview.style.backgroundColor = color;
        document.querySelectorAll('.key-svg .key-base').forEach(element => {
            element.style.fill = color;
        });
    }
    
    // Track price calculation
    let basePrice = 0;
    let colorCustomizationPrice = 0.50;
    let warrantyPrice = 1.00;
    let totalPrice = 0;
    
    // Calculate the current total price based on selections
    function calculatePrice() {
        const selectedKey = document.getElementById('selectedKey').value;
        if (!selectedKey) return 0;
        
        basePrice = parseFloat(keyData[selectedKey]) || 0;
        const hasWarranty = document.getElementById('warranty')?.checked || false;
        
        // Add 50 cents for changing base color
        // Add 50 cents for changing top color
        const colorChangeFee = (hasChangedBaseColor ? 0.50 : 0) + (hasChangedTopColor ? 0.50 : 0);
        
        totalPrice = basePrice + colorChangeFee + (hasWarranty ? warrantyPrice : 0);
        
        // Update the price display
        const priceDisplay = document.getElementById('totalPrice');
        if (priceDisplay) {
            priceDisplay.textContent = '$' + totalPrice.toFixed(2);
        }
        
        return totalPrice;
    }
    
    // Create and update the live preview
    function updateKeyPreview() {
        const keyPreviewContainer = document.getElementById('keyPreview');
        const selectedKey = document.getElementById('selectedKey').value;
        
        if (!keyPreviewContainer || !selectedKey) return;
        
        // Create preview based on the selected key type
        let previewSVG = '';
        const baseColor = baseColorSelect?.value || '#0066CC';
        const topColor = topColorSelect?.value || '#FFFFFF';
        
        // Calculate price with current selections
        calculatePrice();
        
        // Generate the SVG based on key type
        if (selectedKey.includes('WASD')) {
            previewSVG = `
                <svg width="120" height="120" viewBox="0 0 100 100" class="preview-svg">
                    <rect x="10" y="40" width="20" height="20" fill="${baseColor}" rx="4" />
                    <rect x="40" y="70" width="20" height="20" fill="${baseColor}" rx="4" />
                    <rect x="70" y="40" width="20" height="20" fill="${baseColor}" rx="4" />
                    <rect x="40" y="10" width="20" height="20" fill="${baseColor}" rx="4" />
                    <text x="15" y="55" fill="${topColor}" font-weight="bold">A</text>
                    <text x="45" y="85" fill="${topColor}" font-weight="bold">S</text>
                    <text x="75" y="55" fill="${topColor}" font-weight="bold">D</text>
                    <text x="45" y="25" fill="${topColor}" font-weight="bold">W</text>
                </svg>
            `;
        } else if (selectedKey.includes('1x1')) {
            previewSVG = `
                <svg width="120" height="120" viewBox="0 0 100 100" class="preview-svg">
                    <rect x="30" y="30" width="40" height="40" fill="${baseColor}" rx="6" />
                    <text x="45" y="55" fill="${topColor}" font-weight="bold">1</text>
                </svg>
            `;
        } else if (selectedKey.includes('2x1')) {
            previewSVG = `
                <svg width="120" height="120" viewBox="0 0 100 100" class="preview-svg">
                    <rect x="10" y="30" width="80" height="40" fill="${baseColor}" rx="6" />
                    <line x1="50" y1="30" x2="50" y2="70" stroke="${topColor}" stroke-width="1"/>
                </svg>
            `;
        } else if (selectedKey.includes('3x1')) {
            previewSVG = `
                <svg width="120" height="120" viewBox="0 0 100 100" class="preview-svg">
                    <rect x="5" y="30" width="90" height="40" fill="${baseColor}" rx="6" />
                    <line x1="35" y1="30" x2="35" y2="70" stroke="${topColor}" stroke-width="1"/>
                    <line x1="65" y1="30" x2="65" y2="70" stroke="${topColor}" stroke-width="1"/>
                </svg>
            `;
        } else if (selectedKey.includes('2x2')) {
            previewSVG = `
                <svg width="120" height="120" viewBox="0 0 100 100" class="preview-svg">
                    <rect x="20" y="20" width="60" height="60" fill="${baseColor}" rx="6" />
                    <line x1="50" y1="20" x2="50" y2="80" stroke="${topColor}" stroke-width="1"/>
                    <line x1="20" y1="50" x2="80" y2="50" stroke="${topColor}" stroke-width="1"/>
                </svg>
            `;
        } else if (selectedKey.includes('3x2')) {
            previewSVG = `
                <svg width="120" height="120" viewBox="0 0 100 100" class="preview-svg">
                    <rect x="10" y="25" width="80" height="50" fill="${baseColor}" rx="6" />
                    <line x1="37" y1="25" x2="37" y2="75" stroke="${topColor}" stroke-width="1"/>
                    <line x1="63" y1="25" x2="63" y2="75" stroke="${topColor}" stroke-width="1"/>
                    <line x1="10" y1="50" x2="90" y2="50" stroke="${topColor}" stroke-width="1"/>
                </svg>
            `;
        } else if (selectedKey.includes('3x3')) {
            previewSVG = `
                <svg width="120" height="120" viewBox="0 0 100 100" class="preview-svg">
                    <rect x="15" y="15" width="70" height="70" fill="${baseColor}" rx="6" />
                    <line x1="38" y1="15" x2="38" y2="85" stroke="${topColor}" stroke-width="1"/>
                    <line x1="62" y1="15" x2="62" y2="85" stroke="${topColor}" stroke-width="1"/>
                    <line x1="15" y1="38" x2="85" y2="38" stroke="${topColor}" stroke-width="1"/>
                    <line x1="15" y1="62" x2="85" y2="62" stroke="${topColor}" stroke-width="1"/>
                </svg>
            `;
        } else if (selectedKey.includes('4x4')) {
            previewSVG = `
                <svg width="120" height="120" viewBox="0 0 100 100" class="preview-svg">
                    <rect x="10" y="10" width="80" height="80" fill="${baseColor}" rx="6" />
                    <line x1="30" y1="10" x2="30" y2="90" stroke="${topColor}" stroke-width="1"/>
                    <line x1="50" y1="10" x2="50" y2="90" stroke="${topColor}" stroke-width="1"/>
                    <line x1="70" y1="10" x2="70" y2="90" stroke="${topColor}" stroke-width="1"/>
                    <line x1="10" y1="30" x2="90" y2="30" stroke="${topColor}" stroke-width="1"/>
                    <line x1="10" y1="50" x2="90" y2="50" stroke="${topColor}" stroke-width="1"/>
                    <line x1="10" y1="70" x2="90" y2="70" stroke="${topColor}" stroke-width="1"/>
                </svg>
            `;
        }
        
        keyPreviewContainer.innerHTML = previewSVG;
    }
    
    // Function to generate SVG for key options
    function getKeySvg(keyType) {
        if (keyType.includes('WASD')) {
            return `
                <svg width="60" height="60" viewBox="0 0 100 100" class="key-svg">
                    <rect x="10" y="40" width="20" height="20" class="key-base" rx="4" />
                    <rect x="40" y="70" width="20" height="20" class="key-base" rx="4" />
                    <rect x="70" y="40" width="20" height="20" class="key-base" rx="4" />
                    <rect x="40" y="10" width="20" height="20" class="key-base" rx="4" />
                    <text x="15" y="55" fill="white" font-weight="bold" class="key-text">A</text>
                    <text x="45" y="85" fill="white" font-weight="bold" class="key-text">S</text>
                    <text x="75" y="55" fill="white" font-weight="bold" class="key-text">D</text>
                    <text x="45" y="25" fill="white" font-weight="bold" class="key-text">W</text>
                </svg>
            `;
        } else if (keyType.includes('1x1')) {
            return `
                <svg width="60" height="60" viewBox="0 0 100 100" class="key-svg">
                    <rect x="30" y="30" width="40" height="40" class="key-base" rx="6" />
                    <text x="45" y="55" fill="white" font-weight="bold" class="key-text">1</text>
                </svg>
            `;
        } else if (keyType.includes('2x1')) {
            return `
                <svg width="60" height="60" viewBox="0 0 100 100" class="key-svg">
                    <rect x="10" y="30" width="80" height="40" class="key-base" rx="6" />
                    <line x1="50" y1="30" x2="50" y2="70" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                </svg>
            `;
        } else if (keyType.includes('3x1')) {
            return `
                <svg width="60" height="60" viewBox="0 0 100 100" class="key-svg">
                    <rect x="5" y="30" width="90" height="40" class="key-base" rx="6" />
                    <line x1="35" y1="30" x2="35" y2="70" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                    <line x1="65" y1="30" x2="65" y2="70" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                </svg>
            `;
        } else if (keyType.includes('2x2')) {
            return `
                <svg width="60" height="60" viewBox="0 0 100 100" class="key-svg">
                    <rect x="20" y="20" width="60" height="60" class="key-base" rx="6" />
                    <line x1="50" y1="20" x2="50" y2="80" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                    <line x1="20" y1="50" x2="80" y2="50" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                </svg>
            `;
        } else if (keyType.includes('3x2')) {
            return `
                <svg width="60" height="60" viewBox="0 0 100 100" class="key-svg">
                    <rect x="10" y="25" width="80" height="50" class="key-base" rx="6" />
                    <line x1="37" y1="25" x2="37" y2="75" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                    <line x1="63" y1="25" x2="63" y2="75" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                    <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                </svg>
            `;
        } else if (keyType.includes('3x3')) {
            return `
                <svg width="60" height="60" viewBox="0 0 100 100" class="key-svg">
                    <rect x="15" y="15" width="70" height="70" class="key-base" rx="6" />
                    <line x1="38" y1="15" x2="38" y2="85" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                    <line x1="62" y1="15" x2="62" y2="85" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                    <line x1="15" y1="38" x2="85" y2="38" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                    <line x1="15" y1="62" x2="85" y2="62" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                </svg>
            `;
        } else if (keyType.includes('4x4')) {
            return `
                <svg width="60" height="60" viewBox="0 0 100 100" class="key-svg">
                    <rect x="10" y="10" width="80" height="80" class="key-base" rx="6" />
                    <line x1="30" y1="10" x2="30" y2="90" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                    <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                    <line x1="70" y1="10" x2="70" y2="90" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                    <line x1="10" y1="30" x2="90" y2="30" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                    <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                    <line x1="10" y1="70" x2="90" y2="70" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
                </svg>
            `;
        }
        
        return '';
    }
    
    // Event listeners for color pickers
    if (baseColorSelect) {
        baseColorSelect.addEventListener('change', function() {
            // Only mark as changed if not the default color
            hasChangedBaseColor = (this.value !== defaultBaseColor);
            updateBaseColor(this.value);
            updateKeyPreview();
        });
    }
    
    if (topColorSelect) {
        topColorSelect.addEventListener('change', function() {
            // Only mark as changed if not the default color
            hasChangedTopColor = (this.value !== defaultTopColor);
            topColorPreview.style.backgroundColor = this.value;
            updateKeyPreview();
        });
    }
    
    // Handle warranty checkbox
    const warrantyCheckbox = document.getElementById('warranty');
    if (warrantyCheckbox) {
        warrantyCheckbox.addEventListener('change', function() {
            calculatePrice();
        });
    }
    
    // Handle the checkout button
    const checkoutButton = document.getElementById('checkoutButton');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hide the customization form and show checkout form
            const customizeForm = document.getElementById('customizeForm');
            const checkoutForm = document.getElementById('checkoutForm');
            
            if (customizeForm && checkoutForm) {
                customizeForm.style.display = 'none';
                checkoutForm.style.display = 'block';
                
                // Add the current configuration to hidden fields
                const selectedKey = document.getElementById('selectedKey').value;
                document.getElementById('checkout-key').value = selectedKey;
                document.getElementById('checkout-base-color').value = baseColorSelect?.value || '#0066CC';
                document.getElementById('checkout-top-color').value = topColorSelect?.value || '#FFFFFF';
                document.getElementById('checkout-warranty').value = warrantyCheckbox?.checked ? 'Yes' : 'No';
                document.getElementById('checkout-total').value = totalPrice.toFixed(2);
            }
        });
    }
    
    // Back button in checkout form
    const backButton = document.getElementById('backToCustomize');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const customizeForm = document.getElementById('customizeForm');
            const checkoutForm = document.getElementById('checkoutForm');
            
            if (customizeForm && checkoutForm) {
                customizeForm.style.display = 'block';
                checkoutForm.style.display = 'none';
            }
        });
    }
    
    // Handle order submission - for static site just show confirmation in place
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.querySelector('input[name="first_name"]').value;
            const lastName = document.querySelector('input[name="last_name"]').value;
            const lunch = document.querySelector('select[name="lunch"]').value;
            const email = document.querySelector('input[name="email"]').value;
            const product = document.getElementById('checkout-key').value;
            const totalPrice = document.getElementById('checkout-total').value;
            
            // Create a confirmation message
            const confirmationHtml = `
                <div class="confirmation-success text-center py-4">
                    <div class="circle-success mb-3 mx-auto">
                        <i class="fas fa-check"></i>
                    </div>
                    <h3 class="mb-3">Order Complete!</h3>
                    <p class="lead">Thank you for your order, ${firstName}!</p>
                    
                    <div class="order-details mt-4 p-3">
                        <h5 class="mb-3">Order Summary</h5>
                        <div class="row mb-2">
                            <div class="col-6 text-start">Product:</div>
                            <div class="col-6 text-end fw-bold">${product}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-6 text-start">Total:</div>
                            <div class="col-6 text-end fw-bold">$${totalPrice}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-6 text-start">Lunch selection:</div>
                            <div class="col-6 text-end fw-bold">${lunch}</div>
                        </div>
                        <div class="row mb-2">
                            <div class="col-6 text-start">Email:</div>
                            <div class="col-6 text-end fw-bold">${email}</div>
                        </div>
                    </div>
                    
                    <div class="mt-4">
                        <p class="text-muted">A confirmation email has been sent to ${email}</p>
                        <button type="button" class="btn btn-primary mt-3" id="newOrderBtn">
                            Start New Order
                        </button>
                    </div>
                </div>
            `;
            
            // Replace the checkout form with confirmation
            document.querySelector('.card-body').innerHTML = confirmationHtml;
            
            // Add event listener for new order button
            document.getElementById('newOrderBtn').addEventListener('click', function() {
                window.location.reload();
            });
        });
    }
});
