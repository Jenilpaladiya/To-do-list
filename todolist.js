console.log("To do list project start");
loadTasks();



// Click event listener for task cards
$(document).on('click', '.editList', function () {


    let title = $(this).parent().siblings('.task-title').text(); // Get task title
    let description = $(this).parent().siblings('.task-description').text(); // Get task description
    let index=$(this).closest('.col-md-4').index();
    
    // Populate title and description in input fields for editing
    $('#editTitle').val(title);
    $('#editDescription').val(description);
    $('#indexForDemo').val(index);

});

// When save changes button in the modal is clicked, update the todo list item
$('#saveChangesBtn').click(function () {
    
    
    let taskTitle = $('#editTitle').val();
    let taskDescription = $('#editDescription').val();
    let titemIndex=$('#indexForDemo').val();
    
    // Update the new task to the tasks array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    console.log(itemIndex)

    if (itemIndex >= 0 && itemIndex < tasks.length) {
        // Update the todo list item
        tasks[itemIndex].title = taskTitle;
        tasks[itemIndex].description = taskDescription;
    
        // Store the updated todo list back into localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
    }
    
    
    // Update local storage with the updated tasks array
    localStorage.setItem('tasks', JSON.stringify(tasks));

    loadTasks();
    // Update the card with new values
    $('.modal').modal('hide');
});




// This is function is run after form submit
function createTask(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    let taskTitle = $('#taskTitle').val();
    let taskDescription = $('#taskDescription').val();
    index=0;
    // Add the new task to the tasks array
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ title: taskTitle, description: taskDescription ,index:tasks.length+1});

    // Update local storage with the updated tasks array
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Reload tasks to display the new task
    loadTasks();

    // Clear input fields
    $('#taskTitle').val('');
    $('#taskDescription').val('');


}


// load all task before page is ready

function loadTasks() {
    $('#taskCardList').empty(); // Clear previous tasks

    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let i = 1;

    // Add this card into the Html

    tasks.forEach(function (task) {
        let taskList = `
      <div class="col-md-4">
          <div class="task-card">
              <div class="task-actions">
                  <button id="toggleButton" class="btn btn-sm toggleButtonClass" data-toggle="popover"
                      data-placement="top" title="Mark as Done"
                      data-content="Click to mark this task as done"></button>
              </div>
              <div class="task-title" id="demo">${task.title}</div>
              <div class="task-description">${task.description}</div>
              <div class="btn-group">
                  <button class="btn btn-sm btn-edit editList" data-toggle="modal" data-target="#editModal">Edit</button>
                  <button class="btn btn-sm btn-delete deleteList">Delete</button>
              </div>
          </div>
      </div>
      `;

        $('#taskCardList').append(taskList);
    });
}




// Attach event listener to the form's submit event

$(document).ready(function () {
    $('#taskForm').submit(createTask);
});





//   This is for task done or not marking
$(document).ready(function () {

    $('.container').on('click', '.toggleButtonClass', function () {
        $(this).toggleClass('btn-success btn-outline-success'); // Toggle button color
        $(this).text($(this).text() === '✓' ? ' ' : '✓'); // Toggle button text
        $(this).closest('.task-card').toggleClass('task-done'); // Toggle task-done class to adjust height
    });
});
