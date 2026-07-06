const subjectsList = [
  
    "Machine Learning",
    "Software Engineering",
    "Computer Networks",
    "Artificial Intelligence",
    "Cloud Computing",
    "Cyber Security",
    "Operating System",
    "Ethical Hacking",
];

// Populate Subjects Checkboxes
function populateSubjects() {
    const container = document.getElementById('subjectsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    subjectsList.forEach((subject, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 mb-3';
        col.innerHTML = `
            <div class="form-check subject-card border border-secondary rounded-3 p-3">
                <input class="form-check-input" type="checkbox" id="subj${index}" value="${subject}">
                <label class="form-check-label text-light fw-medium" for="subj${index}">
                    ${subject}
                </label>
            </div>
        `;
        container.appendChild(col);
    });
}


// Toggle Hostel Block Field
function toggleHostelField() {
    const hostelRadio = document.getElementById('hosteler');
    const hostelBlockField = document.getElementById('hostelBlockField');
    const hostelSelect = document.getElementById('hostelBlock');
    
    if (hostelRadio && hostelRadio.checked) {
        hostelBlockField.classList.remove('d-none');
        if (hostelSelect) hostelSelect.required = true;
    } else {
        hostelBlockField.classList.add('d-none');
        if (hostelSelect) hostelSelect.required = false;
    }
}

// Reset Form
function resetForm() {
    const form = document.getElementById('registrationForm');
    if (form) form.reset();
    
    // Hide hostel field
    const hostelBlockField = document.getElementById('hostelBlockField');
    if (hostelBlockField) hostelBlockField.classList.add('d-none');
    
    // Close modal properly
    const modalElement = document.getElementById('thankYouModal');
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
    }
}

// Form Submission Handler
document.addEventListener('DOMContentLoaded', function() {
    
    const registrationForm = document.getElementById('registrationForm');
    if (!registrationForm) return;

    registrationForm.addEventListener('submit', async function(e) {

    e.preventDefault();

    if (!this.checkValidity()) {
        this.classList.add('was-validated');
        return;
    }

    // Get selected subjects
    const selectedSubjects = [
        ...document.querySelectorAll(
            '#subjectsContainer input[type="checkbox"]:checked'
        )
    ].map(cb => cb.value);

    // Require exactly 5 subjects
    if (selectedSubjects.length !== 5) {

        alert("Please select exactly 5 subjects.");

        return;
    }

    const residence =
        document.querySelector(
            'input[name="residence"]:checked'
        )?.value || "";

    const formData = {

    first_name:
        document.getElementById('firstName').value,

    last_name:
        document.getElementById('lastName').value,

    dob:
        document.getElementById('dob').value,

    course:
        document.getElementById('course').value,

    personal_email:
        document.getElementById('personalEmail').value,

    university_email:
        document.getElementById('universityEmail').value,

    current_year:
        document.getElementById('currentYear').value,

    graduation_year:
        document.getElementById('graduationYear').value,

    residence_type:
        residence,

    hostel_block:
        residence === "hostel"
            ? document.getElementById('hostelBlock').value
            : null,

    subjects:
        selectedSubjects
};

    try {

        const response = await fetch(
            "http://localhost:5000/register",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/json"
                },
                body: JSON.stringify(formData)
            }
        );

        const result =
            await response.json();

        if (result.success) {

            const thankYouEmailEl =
                document.getElementById(
                    'thankYouEmail'
                );

            if (thankYouEmailEl) {

                thankYouEmailEl.textContent =
                    formData.personal_email;

            }

            const thankYouModal =
                new bootstrap.Modal(
                    document.getElementById(
                        'thankYouModal'
                    )
                );

            thankYouModal.show();

        } else {

            alert(
                result.message ||
                "Unable to save data."
            );

        }

    } catch (error) {

        console.error(error);

        alert(
            "Server connection failed."
        );

    }

});

    // Initialize everything
    populateSubjects();
    
    // Add event listeners for residence radio buttons
    const residenceRadios = document.querySelectorAll('input[name="residence"]');
    residenceRadios.forEach(radio => {
        radio.addEventListener('change', toggleHostelField);
    });
    
    // Add input-focus class to all form controls
    const formControls = document.querySelectorAll('.form-control, .form-select');
    formControls.forEach(control => {
        control.classList.add('input-focus');
    });
});

window.resetForm = resetForm;