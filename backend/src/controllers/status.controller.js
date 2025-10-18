import { uploadStatusService,getStatusService,getStatusByIdService ,deleteStatusService} from '../services/status.service.js'

export const getStatus = async (req, res) => {
    try {
        const response = await getStatusService(req, res);
        if (!response) {
            res.status(400).json({
                error: true,
                success: false,
                message: "error in upload status"
            })
        }
        res.status(200).json({
            error: false,
            success: true,
            message: response
        })
    }
    catch (error) {
        console.log("Error in uploadstatus controller", error)
        res.status(500).json({
            error: true,
            success: false,
            message: error
        })
    }
}
export const getStatusById = async (req, res) => {
    try {
        const response = await getStatusByIdService(req, res);
        if (!response) {
            res.status(400).json({
                error: true,
                success: false,
                message: "error in upload status"
            })
        }
        res.status(200).json({
            error: false,
            success: true,
            message: response
        })
    }
    catch (error) {
        console.log("Error in uploadstatus controller", error)
        res.status(500).json({
            error: true,
            success: false,
            message: error
        })
    }
}
export const uploadStatus = async (req, res) => {
    try {
        const response = await uploadStatusService(req, res);
        if (!response) {
            res.status(400).json({
                error: true,
                success: false,
                message: "error in upload status"
            })
        }
        res.status(200).json({
            error: false,
            success: true,
            message: response
        })
    }
    catch (error) {
        console.log("Error in uploadstatus controller", error)
        res.status(500).json({
            error: true,
            success: false,
            message: error
        })
    }
}
export const deleteStory = async (req, res) => {
    try {
        const response = await deleteStatusService(req, res);
        if (response.error) {
            res.status(400).json({
                message : response
            })
        }
        res.status(200).json({
            error: false,
            success: true,
            message: response
        })
    }
    catch (error) {
        console.log("Error in delete controller", error)
        res.status(500).json({
            error: true,
            success: false,
            message: error
        })
    }
}