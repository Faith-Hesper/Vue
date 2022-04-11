/*
 * @Author: Faith
 * @Date: 2022-04-02 17:08
 * @LastAuthor: Faith
 * @LastEditTime: 2022-04-10 17:35
 * @Description: 超图分析函数
 */


const dataUrl = 'http://localhost:8090/iserver/services/data-earthquakePoints/rest/data'
const spatialanalystUrl = 'http://localhost:8090/iserver/services/spatialAnalysis-earthquakePoints/restjsr/spatialanalyst'

// 窗口
function selectDate(param) {
  let echartControls = L.control({ position: 'topleft' })
  echartControls.onAdd = function (map) {
    let div = L.DomUtil.create('div')
    div.innerHTML = `<div id="toolbar" class="panel panel-primary">
    <div class='panel-heading'>
    <h5 class='panel-title text-center' >查询</h5></div>
    <div class='panel-body content'>
    <div class='panel'>
    <div class='input-group'>
    <span class='input-group-addon' >数据源</span>
    <select id='datasourcesSelect' class='form-control'></select>
    </div>
    </div>
    <div class='panel'>
    <div class='input-group'>
    <span class='input-group-addon'>数据集</span>
    <select id='datasetsSelect' class='form-control'></select>
    </div>
    </div>
    <input type="button" class="btn btn-default" data-i18n="[value]resources.btn_query" onclick="datasetsPrint()"/>
    </div>
    </div>`

    new L.Draggable(div).enable()
    return div
  }
  return echartControls
}

// 获取数据源集合
function dataSource(url = dataUrl) {
  L.supermap.datasourceService(url).getDatasources((serviceResult) => {
    datasourcesSelect = document.getElementById('datasourcesSelect')
    const datasourceNames = serviceResult.result.datasourceNames
    // console.log(serviceResult);
    for (let i = 0, len = datasourceNames.length; i < len; i++) {
      datasourcesSelect.options[i] = new Option(datasourceNames[i], datasourceNames[i])
    }
    const datasourceName = datasourcesSelect.value
    datasetsService(datasourceName)
  })
}

// 获取数据集
function datasetsService(datasourceName, url = dataUrl) {
  L.supermap.datasetService(url).getDatasets(datasourceName, function (serviceResult) {
    const datasetNames = serviceResult.result.datasetNames
    datasetsSelect = document.getElementById('datasetsSelect')
    for (let i = 0, len = datasetNames.length; i < len; i++) {
      datasetsSelect.options[i] = new Option(datasetNames[i], datasetNames[i])
    }
  })
}

// 日期
async function dateSelect(param) {
  const result = await sqlQuery('', '', 'Date_User')
  console.log('1', result)
  datasetsSelect = document.getElementById('dateSelect')
  for (let i = 0, len = result.length; i < len; i++) {
    datasetsSelect.options[i] = new Option(result[i], result[i])
  }
}

// sql查询

async function sqlQuery(url = '', filter = '', group = '') {
  url = url == '' ? dataUrl : url
  filter = filter == '' ? '' : `Date_User> "${filter} 00:00:00"`
  return await new Promise((resolve, reject) => {
    const sqlParam = new SuperMap.GetFeaturesBySQLParameters({
      queryParameter: {
        name: 'earthquakePoint',
        attributeFilter: filter,
        groupBy: group,
      },
      datasetNames: ['points:earthquakePoint'],
      toIndex: 238,
    })
    L.supermap.featureService(url).getFeaturesBySQL(sqlParam, (serviceResult) => {
      serviceResult.type === "processFailed" ? alert(serviceResult.error+"\n请打开iServer服务"):true
      console.log(serviceResult.result)
      resolve(serviceResult.result)
    })
  }).catch((err) => console.log(err))
}

// 缓冲区分析
async function buffer_Analysis() {
  // 缓冲区分析参数
  const butterflyAnalystParams = new SuperMap.DatasetBufferAnalystParameters({
    dataset: 'earthquakePoint@points',
    filterQueryParameter: new SuperMap.FilterParameter({
      attributeFilter: "class>='6.1'",
      name: 'earthquakePoint@points',
    }),
    bufferSetting: new SuperMap.BufferSetting({
      endType: SuperMap.BufferEndType.ROUND,
      leftDistance: { value: 2 },
      rightDistance: { value: 2 },
      semicircleLineSegment: 10,
    }),
  })

  // 分析
  return await new Promise((resolve, reject) => {
    L.supermap
      .spatialAnalystService(spatialanalystUrl)
      .bufferAnalysis(butterflyAnalystParams, (serviceResult) => {
        serviceResult.type === "processFailed" ? alert(serviceResult.error+"\n请打开iServer服务"):true
        resolve(serviceResult.result)
        // L.geoJSON(serviceResult.result.recordset.features).addTo(map)
        console.log(serviceResult.result)
      })
  }).catch((err) => console.log(err))
}

export { selectDate, dataSource, dateSelect, buffer_Analysis }
export default sqlQuery
