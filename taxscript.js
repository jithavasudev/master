document.addEventListener("DOMContentLoaded", function() {
    const calculateBtn = document.getElementById("calculateBtn");
    const alert = document.getElementById("alert");
    const closeBtn = document.querySelector(".close");
    const taxForm = document.getElementById("taxForm");

    calculateBtn.addEventListener("click", function() {
        const income = parseFloat(document.getElementById("income").value) || 0;
        const extraIncome = parseFloat(document.getElementById("extraIncome").value) || 0;
        const deductions = parseFloat(document.getElementById("deductions").value) || 0;
        const age = document.getElementById("age").value;

        let tax = 0;

        if (income + extraIncome - deductions <= 8) {
            tax = 0;
        } else {
            const taxableIncome = income + extraIncome - deductions - 8;
            if (age === "<40") {
                tax = taxableIncome * 0.3;
            } else if (age === "≥40 &lt;60") {
                tax = taxableIncome * 0.4;
            } else if (age === "≥60") {
                tax = taxableIncome * 0.1;
            }
        }

// alert(`Your tax amount is: ${tax.toFixed(2)} Lakhs`);
        document.getElementById("taxResult").textContent = `Your overall income after tax deduction is: ${tax.toFixed(2)}`;
        alert.style.display = "block";
    });

    closeBtn.addEventListener("click", function() {
        alert.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == alert) {
            alert.style.display = "none";
        }
    });

    // Form Validation
    taxForm.addEventListener("input", function(event) {
        const target = event.target;
        const errorId = target.id + "Error";

        if (target.checkValidity()) {
            document.getElementById(errorId).style.display = "none";
        } else {
            document.getElementById(errorId).style.display = "inline";
        }
    });

    taxForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const inputs = taxForm.querySelectorAll("input");
        const select = taxForm.querySelector("select");
        let isValid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                const errorId = input.id + "Error";
                document.getElementById(errorId).style.display = "inline";
                isValid = false;
            }
        });

        if (!select.checkValidity()) {
            const errorId = select.id + "Error";
            document.getElementById(errorId).style.display = "inline";
            isValid = false;
        }

        if (isValid) {
            calculateBtn.click();
        }
    });
});