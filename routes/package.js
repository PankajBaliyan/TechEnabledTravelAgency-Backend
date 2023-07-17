const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Package = require('../models/package');

router.get('/getAllPackages', (req, res) => {
    Package.find()
        .then((packages) => {
            res.json(packages);
        })
        .catch((error) => {
            console.error('Failed to get packages', error);

            res.send(error);
        });
});

router.get('/getPackageById/:id', (req, res) => {
    const packageId = req.params.id;
    Package.findById(packageId)
        .then((package) => {
            res.json(package);
        })
        .catch((error) => {
            console.error('Failed to get package', error);
            res.send(error);
        });
});

router.post('/createPackage', async (req, res) => {
    const {
        packageName,
        agencyName,
        amount,
        contactEmail,
        contactPhoneNumber,
        sourceLocation,
        destinationLocation,
        routeOnMap,
        duration,
    } = req.body;
    console.log(packageName);
    console.log(agencyName);

    const newPackage = await new Package({
        packageName,
        agencyName,
        amount,
        contactEmail,
        contactPhoneNumber,
        sourceLocation,
        destinationLocation,
        routeOnMap,
        duration,
    });

    newPackage
        .save()
        .then(() => {
            console.log('save ho gaya');
            // res.redirect('/getAllPackages');
            res.json(newPackage);
        })
        .catch((error) => {
            console.error('Failed to create package', error);
            res.render('error');
        });
});

router.patch('/updatePackageById/:id', async (req, res) => {
    const packageId = req.params.id;

    const {
        packageName,
        agencyName,
        amount,
        contactEmail,
        contactPhoneNumber,
        sourceLocation,
        destinationLocation,
        routeOnMap,
        duration,
    } = req.body;

   try {
    const updatedPackage = await Package.findByIdAndUpdate(packageId, {
      packageName,
      agencyName,
      amount,
      contactEmail,
      contactPhoneNumber,
      sourceLocation,
      destinationLocation,
      routeOnMap,
      duration,
    }, { new: true });

    console.log('Updated package:', updatedPackage);
    res.json(updatedPackage);
  } catch (error) {
    console.error('Failed to update package', error);
    res.send(error);
  }
});

router.delete('/deletePackageById/:id', (req, res) => {
    const packageId = req.params.id;

    Package.findByIdAndDelete(packageId)
        .then(() => {
            // res.redirect('/getAllPackages');
            res.send("delete ho gya")
        })
        .catch((error) => {
            console.error('Failed to delete package', error);
            res.send("delete nhi hua")
        });
});

module.exports = router;
