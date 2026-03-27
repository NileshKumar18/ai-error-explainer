import redis from '../config/redis.js'

 const RATE_LIMIT = 5;
 const WINDOW = 60;


const rateLimiter = async (req, res, next) => {

    const key = `rate:${req.ip}`
    const requests = await redis.incr(key);

    if(requests === 1){
        await redis.expire(key , WINDOW)
    }
    if(requests > RATE_LIMIT){
        return res.status(409).json({
            success:false,
            message:"Too many request , Try again after some time"
        })
    }
    next();
}
 export default rateLimiter;