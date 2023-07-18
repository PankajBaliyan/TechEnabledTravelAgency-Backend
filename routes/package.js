const express = require('express');
const router = express.Router();
const Package = require('../models/package');

// Create Packages
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

    try {
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

        await newPackage.save();

        res.json(newPackage);
    } catch (error) {
        console.error('Failed to create package', error);
        res.status(500).json({ message: 'Failed to create package' });
    }
});

/// Get All Packages
router.get('/getAllPackages', (req, res) => {
    Package.find()
        .then((packages) => {
            res.json(packages);
        })
        .catch((error) => {
            console.error('Failed to get packages', error);
            res.status(500).json({ message: 'Failed to get packages' });
        });
});

// Get Package By Id
router.get('/getPackageById/:id', (req, res) => {
    const packageId = req.params.id;
    Package.findById(packageId)
        .then((packageFound) => {
            if (!packageFound) {
                // If the package is not found, return an error response
                return res.status(404).json({ message: 'Package not found' });
            }
            res.json(packageFound);
        })
        .catch((error) => {
            console.error('Failed to get package', error);
            res.status(500).json({ message: 'Failed to get package' });
        });
});

// Update Package By Id
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
        const updatedPackage = await Package.findByIdAndUpdate(
            packageId,
            {
                packageName,
                agencyName,
                amount,
                contactEmail,
                contactPhoneNumber,
                sourceLocation,
                destinationLocation,
                routeOnMap,
                duration,
            },
            { new: true },
        );

        if (!updatedPackage) {
            // If the package is not found, return an error response
            return res.status(404).json({ message: 'Package not found' });
        }

        console.log('Updated package:', updatedPackage);
        res.json(updatedPackage);
    } catch (error) {
        console.error('Failed to update package', error);
        res.status(500).json({ message: 'Failed to update package' });
    }
});

// Delete Package By Id
router.delete('/deletePackageById/:id', (req, res) => {
    const packageId = req.params.id;

    Package.findByIdAndDelete(packageId)
        .then((deletedPackage) => {
            if (!deletedPackage) {
                // If the package is not found, return an error response
                return res.status(404).json({ message: 'Package not found' });
            }
            res.status(200).json({ message: 'Package deleted successfully' });
        })
        .catch((error) => {
            console.error('Failed to delete package', error);
            res.status(500).json({ message: 'Failed to delete package' });
        });
});

module.exports = router;
