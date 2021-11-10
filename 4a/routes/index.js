const express = require('express');
const router = express.Router();
const connect = require('../lib/db');

/* GET kabupaten */
router.get('/', (req, res) => {
   connect.query(` SELECT kabupaten.id, kabupaten.nama, kabupaten.diresmikan, kabupaten.photo, 
   provinsi.nama as provinsi FROM kabupaten INNER JOIN provinsi ON provinsi.id = provinsi_id ORDER BY id ASC `, (err, result) => {
      if (err) throw err;

      res.render('index', { app: 'Crud', result });
   })
});

/* GET  kabupaten add page */

router.get('/kabupaten/add', (req, res) => {
   connect.query("SELECT * FROM provinsi", (err, result) => {
      if (err) throw err;

      res.render('kabupaten/create', { app: "Add Kabupaten", result })
   })
})

router.post('/kabupaten/store', (req, res) => {
   const storeData = {
      nama: req.body.nama,
      provinsi_id: parseInt(req.body.provinsi),
      diresmikan : req.body.diresmikan ,
      photo :req.body.photo,
   }

   let errors = false; 

   if (!storeData.nama.length) { 
      errors = true;
      req.flash('fail', `Fail ! <br />Nama Field Cannot Be Empty`)
      res.redirect('/kabupaten/add')
   }

 
   if(!storeData.provinsi_id == null) {
      errors = true;
      req.flash('fail', `Fail ! <br />provinsi Field Cannot Be Empty`)
      res.redirect('/kabupaten/add')
   }
   if (!storeData.diresmikan.length) { 
      errors = true;
      req.flash('fail', `Fail ! <br />diresmikan Field Cannot Be Empty`)
      res.redirect('/kabupaten/add')
   }
   if (!storeData.photo.length) { 
      errors = true;
      req.flash('fail', `Fail ! <br />photo Field Cannot Be Empty`)
      res.redirect('/kabupaten/add')
   }

  

   if (!errors) {
      connect.query('INSERT INTO kabupaten SET ?', storeData, (err) => {
         if (err) throw err;;
   
         req.flash('successCreate', `Add Success ! <br />Added New kabupaten <b>${storeData.nama}</b>`)
         res.redirect('/');
      })
   }
})  




router.get('/provinsi/add', (req, res) => {
   connect.query("SELECT * FROM provinsi", (err, result) => {
      if (err) throw err;

      res.render('provinsi/create', { app: "Add provinsi", result })
   })
})


router.post('/provinsi/store', (req, res) => {
   const storeData = {
      nama: req.body.nama,
      diresmikan :req.body.diresmikan,
      photo :req.body.photo,
      pulau:req.body.photo,
   }

   let errors = false; 

   if (!storeData.nama.length) { 
      errors = true;
      req.flash('fail', `Fail ! <br />Nama Field Cannot Be Empty`)
      res.redirect('/provinsi/add')
   }
   if (!storeData.diresmikan.length) { 
      errors = true;
      req.flash('fail', `Fail ! <br /diresmikan Field Cannot Be Empty`)
      res.redirect('/provinsi/add')
   }
   if (!storeData.photo.length) { 
      errors = true;
      req.flash('fail', `Fail ! <br />photo Field Cannot Be Empty`)
      res.redirect('/provinsi/add')
   }
   if (!storeData.pulau.length) { 
      errors = true;
      req.flash('fail', `Fail ! <br />Name Field Cannot Be Empty`)
      res.redirect('/provinsi/add')
   }


   if (!errors) {
      connect.query('INSERT INTO provinsi SET ?', storeData, (err) => {
         if (err) throw err;;
   
         req.flash('successCreate', `Add Success ! <br />Added New provinsi <b>${storeData.nama}</b>`)
         res.redirect('/');
      })
   }
})

/* GET  provinsi update page */
router.get('/kabupaten/edit/:id', (req, res) => {
   connect.query(`  SELECT kabupaten.id, kabupaten.nama, kabupaten.diresmikan, kabupaten.photo,
   provinsi.nama as provinsi, 
   provinsi.id as provinsiID FROM kabupaten INNER JOIN provinsi ON provinsi.id = provinsi_id 
  WHERE kabupaten.id=${req.params.id}`, (err, result) => {
      if (err) throw err;
      
      res.render('kabupaten/update', {
         app: `Update kabupaten ${result[0].nama}`,
         id: result[0].id,
         nama: result[0].nama,
         provinsi: result[0].provinsi, 
         provinsiID: result[0].provinsiID, 
         diresmikan: result[0].diresmikan,
         photo : result[0].photo,
      })
   })
})

/* UPDATE data from kabupaten on modal */
router.post('/kabupaten/update', (req, res) => {
   const updateData = {
      id: req.body.id,
      nama: req.body.nama,
      provinsi_id: req.body.provinsi,
      diresmikan : req.body.diresmikan,
      photo : req.body.photo,
      
   }

   if (!updateData.nama.length ||
       !updateData.provinsi_id.length ||
       !updateData.diresmikan.length ||
       !updateData.photo.length ) {
      req.flash('fail', `Fail ! <br />All Fields Cannot Be Empty`)
      
      connect.query(`SELECT kabupaten.id, kabupaten.nama, kabupaten.diresmikan, kabupaten.photo, provinsi.nama as provinsi, provinsi.id as provinsiID FROM kabupaten INNER JOIN provinsi ON provinsi.id = provinsi_id   WHERE kabupaten.id=${req.body.id}`, (err, result) => {
         if (err) throw err;
         
         res.render('kabupaten/update', {
            app: `Update kapupaten ${result[0].nama}`,
            id: result[0].id,
            nama: result[0].nama,
            provinsi: result[0].provinsi, 
            provinsiID: result[0].provinsiID, 
            diresmikan : result[0].diresmikan,
            photo: result[0].photo,
         
         })
      })
   } else {
      connect.query(`UPDATE kabupaten SET ? WHERE id = ${req.body.id}`, updateData, (err) => {
         if (err) throw err;
   
         req.flash('successUpdate', `Update Success ! <br />Updated kabupaten <b>${updateData.nama}</b>`)
         res.redirect('/'); 
      })
   }
})

/* DELETE data from kabupaten page */
router.get('/kabupaten/delete/:id', (req, res) => {
   connect.query(`DELETE FROM kabupaten WHERE id=${req.params.id}`, (err) => {
      if (err) throw err;

      req.flash('delete', `Delete Success ! <br />kabupaten Has Deleted`)
      res.redirect('/')
   })
})



module.exports = router;
