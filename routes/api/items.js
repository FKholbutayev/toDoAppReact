const express = require('express'); 
const router = express.Router(); 


//Item model
const Item = require('../../models/Item'); 

// @route GET api/items
// @desc Get all todos; 
// @access Public

getDateRange = (date) => {
    let month = date.toLocaleDateString('en-us', {month:'2-digit'})
    let year =  date.toLocaleDateString('en-us', {year:'numeric'})
    let day = date.toLocaleDateString('en-us', {day:"2-digit"})
    return `${year}-${month}-${day}`;
}

router.get('/', (req, res) => {
    const date = new Date(req.query.date);
    const tomorrow = new Date(req.query.date); 
    const newDate = new Date(tomorrow.setDate(tomorrow.getDate()+1)); 
   
    let filterDay = getDateRange(date)
    let filterDayT = getDateRange(newDate)
  

    Item.find({date:{$gt:filterDay, $lt:filterDayT}})
        .then(items => res.json(items))
        .catch(err => res.status(400).send({message:"errorko"}))
})

// @route  POST api/items
// @desc   Create a todo item 
// @access Public  

router.post('/', (req, res) => {
    
    const newToDoItem = new Item({
        todo: req.body.todo, 
        memo: req.body.memo, 
        date: req.body.date
    }) 

    newToDoItem.save()
        .then(item => res.json(item))
        .catch(err => res.status(404).send({message:'errorishe'}))});

// @route UPDATE api/items
// @desc Update memo 
// @access Public 

router.post('/:id/memo', (req, res) => {
    Item.findById(req.params.id)
    .then(item => {
        console.log("item db", item)
        const memoAdded = Object.assign(item, req.body); 
        console.log("memoadded", memoAdded)
        memoAdded.save()
            .then( () => res.json('Memo added')) 
            .catch(err => res.status(400).json(`Error ${err}`))

    })
})

// @route  DELETE api/items
// @desc   Create a todo item 
// @access Public 
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success:true})))        
    .catch(err => res.status(404).json({success:false, message:err}))
})


module.exports = router;