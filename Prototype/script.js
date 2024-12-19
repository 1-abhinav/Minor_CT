document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const roleInput = document.getElementById("role");

    // Pages
    const loginPage = document.getElementById("login-page");
    const studentDashboardPage = document.getElementById("student-dashboard-page");
    const professorDashboardPage = document.getElementById("professor-dashboard-page");

    // Timetable
    const subjects = document.querySelectorAll(".subject");
    let selectedSubject = null;

    // Buttons and Forms
    const submitNotesBtn = document.getElementById("submit-notes-btn");
    const uploadNotesBtn = document.getElementById("upload-notes-btn");
    const formatSelect = document.getElementById("format");
    const fileUpload = document.getElementById("fileUpload");
    const notesTextarea = document.getElementById("notes");

    const sectionSelect = document.getElementById("section");
    const lectureTimeSelect = document.getElementById("lecture-time");
    const deadlineSelect = document.getElementById("deadline");
    const deadlinesList = document.getElementById("deadlinesList");

    // Current score and leaderboard position
    const currentScoreElement = document.getElementById("current-score");
    const leaderboardPositionElement = document.getElementById("leaderboard-position");

    // Fake student data for AI scoring
    const studentScores = [
        { name: "Alice", score: 85 },
        { name: "Bob", score: 90 },
        { name: "Charlie", score: 75 },
        { name: "Diana", score: 95 },
        { name: "Ethan", score: 80 },
    ];

    // Handle login
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const role = roleInput.value;

        if (role === "student") {
            loginPage.classList.remove("active");
            studentDashboardPage.classList.add("active");

            // Set fake data for the student
            const studentScore = 85; // Replace with actual score retrieval logic
            currentScoreElement.textContent = `Current Score: ${studentScore}`;
            leaderboardPositionElement.textContent = `Leaderboard Position: 2`;
        } else if (role === "professor") {
            loginPage.classList.remove("active");
            professorDashboardPage.classList.add("active");
        }
    });

    // Handle subject selection from timetable
    subjects.forEach(subject => {
        subject.addEventListener("click", function () {
            if (selectedSubject) {
                selectedSubject.classList.remove("selected");
            }
            selectedSubject = this;
            selectedSubject.classList.add("selected");
            alert(`You selected ${selectedSubject.dataset.subject}`);
        });
    });

    // Handle format change for notes submission
    formatSelect.addEventListener("change", function () {
        if (this.value === "file") {
            fileUpload.style.display = "block";
            notesTextarea.style.display = "none";
        } else {
            fileUpload.style.display = "none";
            notesTextarea.style.display = "block";
        }
    });

    // Handle student notes submission
    submitNotesBtn.addEventListener("click", function () {
        const notesContent = formatSelect.value === "text" ? notesTextarea.value : fileUpload.files[0]?.name;

        if (!selectedSubject || !notesContent) {
            alert("Please select a subject and enter your notes.");
            return;
        }

        const deadlineText = `Subject: ${selectedSubject.dataset.subject}, Notes: ${notesContent}`;
        const li = document.createElement("li");
        li.textContent = deadlineText;
        deadlinesList.appendChild(li);
        notesTextarea.value = ""; // Clear the textarea
        alert("Notes submitted successfully!");
    });

    // Handle professor notes upload
    uploadNotesBtn.addEventListener("click", function () {
        const section = sectionSelect.value;
        const lectureTime = lectureTimeSelect.value;
        const lectureDate = document.getElementById("lecture-date").value;
        const deadlineTime = deadlineSelect.value;

        if (!section || !lectureTime || !lectureDate || !deadlineTime) {
            alert("Please fill in all fields.");
            return;
        }

        const deadlineText = `Lecture on ${lectureDate} for Section ${section} at ${lectureTime}. Deadline set: ${deadlineTime} minutes after lecture.`;
        const li = document.createElement("li");
        li.textContent = deadlineText;
        deadlinesList.appendChild(li);
        alert("Lecture notes uploaded and deadline set!");
    });

    // Load AI score chart for professors
    function loadAIScoreChart() {
        const ctx = document.getElementById('aiScoreChart').getContext('2d');
        const labels = studentScores.map(student => student.name);
        const data = studentScores.map(student => student.score);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Student Scores',
                    data: data,
                    backgroundColor: 'rgba(0, 122, 255, 0.6)',
                    borderColor: 'rgba(0, 122, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true,
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                    }
                }
            }
        });
    }
    loadAIScoreChart();
});
