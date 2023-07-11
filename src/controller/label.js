import { labels } from "../route/label.js";

export default {
    getAllLabels: (req, res) => {
        return res.status(200).json({
            status: 'success',
            message: 'Successfully requested all labels',
            data: labels
        });
    },
    
    getOneLabel: (req, res) => {
        const { id } = req.params;
        const label = labels.find((label) => label.id == id)

        if(label) {
            return res.status(200).json({
                status: 'success',
                message: `Successfully requested label with id ${id}`,
                data: label
            });
        } else {
            return res.status(404).json({
                status: 'error',
                message: `label with id: ${id} not found`
            })
        }
        
    },

    addLabel: (req, res) => {
        try {
            const { name } = req.body;
            const newLabel = { id: labels.length + 1, name: name };
            labels.push(newLabel);
        
            return res.status(200).json({
                status: "success",
                message: `Successfully added a label`,
                data: newLabel
            });
        } catch (err) {
            return res.status(404).json({
                status: "error",
            });
        }
    },
    
    updateLabel: (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        const label = labels.find(label => label.id == id);
        
        if(!label) {
            return res.status(404).json({
                status: 'error',
                message: `Label with id ${id} not found`
            });
        }
        
        if (name) {
            label.name = name;
        }
        
        return res.status(200).json({
            status: 'succes',
            message: `Successfully updated label with id ${id}`,
            data: label
        })
    },

    deleteLabel: (req, res) => {
        const { id } = req.params;
        let indexToDelete = labels.findIndex(label => label.id == id);
        console.log(indexToDelete);
        
        if(!indexToDelete) {
            return res.status(404).json({
                status: 'error',
                message: `Label with id ${id} not found`
            });
        }

        labels.splice(indexToDelete, 1);
        
        return res.status(200).json({
            status: 'succes',
            message: `Successfully deleted label with id ${id}`,
            data: labels
        })
    },
}