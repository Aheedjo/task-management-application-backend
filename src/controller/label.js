import { Label } from "../model/index.js";

export default {
    getAllLabels: async (req, res) => {
        const allLabels = await Label.find();

        return res.status(200).json({
            status: 'success',
            message: 'Successfully requested all labels',
            data: allLabels
        });
    },
    
    getOneLabel: async (req, res) => {
        const { id } = req.params;
        const label = await Label.findOne({_id: id});

        if(label) {
            return res.status(200).json({
                status: 'success',
                message: `Successfully requested label`,
                data: label
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: `label not found`
            });
        }
    },

    addLabel: async (req, res) => {
        const { name } = req.body;
        const label = await Label.create({
            name: name
        }).catch((err) => {
            return res.status(400).json({
                status: 'error',
                message: `Invalid values passed`,
            })
        });
        
        return res.status(200).json({
            status: "success",
            message: `Successfully added a label`,
            data: label
        });
    },
    
    updateLabel: async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        const label = await Label.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    name: name,
                },
            },
            {
                new: true,
            }
        );
        
        if(!label) {
            return res.status(404).json({
                status: 'error',
                message: `Label not found`
            });
        }
        
        return res.status(200).json({
            status: 'succes',
            message: `Successfully updated label`,
            data: label
        })
    },

    deleteLabel: async (req, res) => {
        const { id } = req.params;
        const label = await Label.findOneAndDelete({ _id: id });
        
        if(!label) {
            return res.status(404).json({
                status: 'error',
                message: `Label not found`
            });
        }
        
        return res.status(200).json({
            status: 'succes',
            message: `Successfully deleted label`,
        })
    },
}