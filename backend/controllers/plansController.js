
const tokenBucket = async (req, res) => {
    res.status(200).json({ message: 'Token Bucket' });
    
}

const pro = async (req, res) => {
    res.status(200).json({ message: 'Pro', response: 'ok'});
    
}

const enterprise = async (req, res) => {

    res.status(200).json({ message: 'Enterprise', response: 'ok' });
    
} 

const free = async (req, res) => {

    res.status(200).json({ message: 'Free', response: 'ok'});
    
}

module.exports = { pro, enterprise, free, tokenBucket }