# streamframe-coding-assignment list of assignments implemented | BY: FELIPE VELASQUEZ
•(IMPLEMENTED) Create a task listing page that shows a flat list of individual tasks and:
    o Each task’s ID, description, and status.
    o A status checkbox for each task to toggle its status between “DONE” and “IN
    PROGRESS” when clicked.
    
• (IMPLEMENTED) The task listing page should feature a status filter (IN PROGRESS, DONE, COMPLETE).

• (IMPLEMENTED) Create a task creation form that takes the following inputs:
    o Task Name (required).
    o Parent Task ID (optional).

• (IMPLEMENTED) Check for and prevent circular dependencies when creating a task that specifies a
    parent.

• (IMPLEMENTED) Upgrade the task listing page so that parent tasks also show:
    o The total number of dependencies.
    o The number of dependencies marked as DONE.
    o The number of dependencies marked as COMPLETE.

(IMPLEMENTED) • Upgrade the task listing page so that:
    o Marking a task as DONE will also check the status of all dependencies. When
    all dependencies are COMPLETE, mark the task as COMPLETE (instead of
    DONE).
    o Marking a task as IN PROGRESS (by clearing the status checkbox) should
    update its parent task (if it has one) so that the parent’s status changes from
    COMPLETE to DONE. A parent task must not revert to IN PROGRESS from
    DONE or COMPLETE.
    o Repeat these two processes on the task’s parents (if any) until the status
    change has propagated all the way to the top of the hierarchy.

(NOT IMPLEMENTED) • Upgrade the task listing page from a flat list to a nested hierarchal list. That is, all of
    the dependencies for a task should appear in a separate list within the parent task.

(IMPLEMENTED) • Upgrade the task listing page to allow tasks to be edited:
            
            o Allow a task’s name to be changed.
            
            o Allow a task’s parent task to be changed. Doing this must trigger a status
            change propagation behaviour as described above.
