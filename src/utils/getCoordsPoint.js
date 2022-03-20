import { gaode } from '../api/base'

async function getCoordinate(page,city="唐山市") {
  let pointData = []
  // 获取高德地图Api中的数据
  const { data: { pois }, } = await gaode(page,city).catch(err => console.log(err))
  console.log(pois)
  pois.forEach((item) => {
    // 将api中字符串类型的坐标转换成latlng形式: 纬度、经度
    let loactionString = item.location.split(',')
    let point = L.latLng(parseFloat(loactionString[1]), parseFloat(loactionString[0]))

    let datas = {
      id: item.id,
      type: item.type,
      typecode: item.typecode,
      address: item.address,
      adname: item.adname,
      cityname: item.cityname,
      name: item.name,
      pname: item.pname,
      location: point,
    }
    pointData.push(datas)
  })

  return pointData
}

export default getCoordinate
