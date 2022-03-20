import axios from 'axios'
async function gaode(pageNum,city="唐山市") { 
    const data = await axios.get(`/gaode/v3/place/text?key=5833fc2ab01735a6c6fd3a72d1b43459&keywords=应急&city=${city}&page=${pageNum}&citylimit=true`)
    return data
}

export { gaode }