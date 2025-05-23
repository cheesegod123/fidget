// Main JavaScript for fidget.com website

document.addEventListener('DOMContentLoaded', function() {
    // Auto-submit form when a radio button is clicked (optional feature)
    const radioButtons = document.querySelectorAll('.btn-check');
    const autoSubmit = false; // Set to true to enable auto-submission
    
    if (autoSubmit) {
        radioButtons.forEach(radio => {
            radio.addEventListener('change', function() {
                document.getElementById('keyForm').submit();
            });
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

    // If there's a selection result, scroll to it after a short delay
    const selectionResult = document.querySelector('.selection-result');
    
    if (selectionResult) {
        setTimeout(() => {
            selectionResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
    
    // Add smooth transition to all interactive elements
    document.querySelectorAll('button, .btn, .key-label').forEach(el => {
        el.style.transition = 'all 0.3s ease';
    });
    
    // Handle color customization
    const baseColorSelect = document.getElementById('baseColor');
    const topColorSelect = document.getElementById('topColor');
    const baseColorPreview = document.getElementById('baseColorPreview');
    const topColorPreview = document.getElementById('topColorPreview');
    const keyPreviewContainer = document.getElementById('keyPreview');
    const selectedKey = document.querySelector('.selection-result strong')?.textContent;
    
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
    
    // Keep track of color changes - start with default colors
    // Default to not charging for the initial color selection
    let hasChangedBaseColor = false;
    let hasChangedTopColor = false;
    
    // Store default colors to track changes
    const defaultBaseColor = "#0066CC";
    const defaultTopColor = "#FFFFFF";
    
    // Calculate the current total price based on selections
    function calculatePrice() {
        if (!selectedKey) return 0;
        
        const keyPrice = parseFloat(document.querySelector('.key-price').innerText.replace('$', ''));
        basePrice = keyPrice || 0;
        const hasWarranty = document.getElementById('warranty')?.checked || false;
        
        // Add 50 cents for changing base color
        // Add 50 cents for changing top color
        const colorChangeFee = (hasChangedBaseColor ? 0.50 : 0) + (hasChangedTopColor ? 0.50 : 0);
        
        totalPrice = basePrice + colorChangeFee + (hasWarranty ? warrantyPrice : 0);
        
        // Update the price display if it exists
        const priceDisplay = document.querySelector('.price-display .badge');
        if (priceDisplay) {
            priceDisplay.textContent = '$' + totalPrice.toFixed(2);
        }
        
        return totalPrice;
    }
    
    // Create and update the live preview
    function updateKeyPreview() {
        if (!keyPreviewContainer || !selectedKey) return;
        
        // Create preview based on the selected key type
        let previewSVG = '';
        const baseColor = baseColorSelect?.value || '#2196f3';
        const topColor = topColorSelect?.value || '#64b5f6';
        
        // Calculate price with current selections
        calculatePrice();
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
    
    // Handle warranty checkbox without form submission
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
                document.getElementById('checkout-key').value = selectedKey;
                document.getElementById('checkout-base-color').value = baseColorSelect?.value || '#0066CC';
                document.getElementById('checkout-top-color').value = topColorSelect?.value || '#64b5f6';
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
    
    // Initialize preview
    updateKeyPreview();
});
