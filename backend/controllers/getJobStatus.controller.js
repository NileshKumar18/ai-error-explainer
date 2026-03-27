import { aiQueue } from "../config/queue.js";

export const getJobStatus = async (req, res) => {
    const { jobId } = req.params;
    try {
        const job = await aiQueue.getJob(jobId);

        if (!job) {
            return res.status(400).json({
                success: false,
                message: "Job not found"
            })

        }
        const state = await job.getState();

        if (state === "completed") {
            return res.status(200).json({
                success: true,
                status: "completed",
                data: job.returnvalue
            })
        }

        if (state === "failed") {
            return res.status(500).json({
                success: false,
                status: "failed",
                message: "Job failed"
            });
        }

        return res.status(200).json({
            success: true,
            status: state
        })
    } catch (err) {
        console.log("Status error:", err);
        return res.status(500).json({
            success: false,
            message: "Error fetching job status"
        });

    }

}