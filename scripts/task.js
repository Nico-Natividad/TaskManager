// DEFINE class Task:
//   FUNCTION constructor(title, description, color, date, status, budget):
//     SET this.title = title
//     SET this.desc = description
//     SET this.color = color
//     SET this.date = date
//     SET this.status = status
//     SET this.budget = budget
//   END FUNCTION
// END class

class Task{
    constructor(title,description, color, date, status, budget){
        this.title =  title;
        this.desc =  description;
        this.color = color;
        this.date = date;
        this.status =  status;
        this.budget = budget;
    }
}