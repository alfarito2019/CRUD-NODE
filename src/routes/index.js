const {Router} = require('express');
const {db}= require('../firebase');

const router = Router();

// MOSTRAR TODOS LOS DATOS

router.get('/contacts', async (req,res)=>{

    const querySnapshot = await  db.collection('contacts').get()

    const contacts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))


    console.log(contacts);
    res.send('Hello')
})


//INSERTAR EN BASE DE DATOS

router.post('/new-contact',async (req,res)=>{ //Se crea una ruta

    const {firstname, lastname, email, phone } = req.body //Se traen los datos que el formulario está enviando

    await db.collection('contacts').add({ //Se guardan estos datos en firebase
        firstname,
        lastname,
        email,
        phone
    })

    res.send('new contact created')
})

module.exports = router;