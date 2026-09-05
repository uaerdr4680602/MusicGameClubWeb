import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 相對根目錄定位 public 與 src
const imgDir = path.join(__dirname, '../public/img/activity')
const activitiesFile = path.join(__dirname, '../src/json/activities.json')

let oldActivities = []
try {
  oldActivities = JSON.parse(fs.readFileSync(activitiesFile, 'utf8'))
} catch {
  // ignore
}

const oldMap = {}
oldActivities.forEach(a => {
  oldMap[a.id] = a
})

const semesters = ['114_1', '114_2']
const newActivities = []

semesters.forEach(semester => {
  const semDir = path.join(imgDir, semester)
  if (!fs.existsSync(semDir)) return

  const acts = fs.readdirSync(semDir).filter(f => f.startsWith('act_')).sort()
  acts.forEach(act => {
    const actDir = path.join(semDir, act)
    const files = fs.readdirSync(actDir).filter(f => !f.startsWith('.')).sort((a, b) => {
      const matchA = a.match(/_(\d+)\./)
      const matchB = b.match(/_(\d+)\./)
      const numA = matchA ? parseInt(matchA[1], 10) : 0
      const numB = matchB ? parseInt(matchB[1], 10) : 0
      return numA - numB
    })

    const images = files.map(f => `/img/activity/${semester}/${act}/${f}`)
    const key = `${semester}_${act}`
    const semPrefix = semester.replace('_', '-')

    let label = ''
    if (act === 'act_00') {
      label = '社員大會'
    } else {
      const num = parseInt(act.replace('act_', ''), 10)
      const numStr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][num] || num
      label = `第${numStr}次`
    }

    const old = oldMap[key] || oldMap[act.replace('act_', '')]

    newActivities.push({
      id: key,
      semester: semPrefix,
      label: label,
      title: old?.title ? old.title : `${semPrefix} ${label}`,
      body: old?.body ? old.body : `${semPrefix} ${label}社團活動與紀錄`,
      images: images,
    })
  })
})

fs.writeFileSync(activitiesFile, JSON.stringify(newActivities, null, 2))
console.log('Done generating activities.json')
