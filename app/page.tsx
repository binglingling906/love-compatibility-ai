'use client'
import { useState } from 'react'
import { 
  FaHeart, 
  FaHistory, 
  FaShare, 
  FaTrash, 
  FaStar, 
  FaUserAlt, 
  FaBirthdayCake, 
  FaHourglass 
} from 'react-icons/fa'

interface PersonData {
  name: string
  age: string
  zodiac: string
}

interface HistoryRecord {
  date: string
  person1: PersonData
  person2: PersonData
  score: number
  analysis: string
}

export default function Home() {
  const [person1, setPerson1] = useState<PersonData>({
    name: '',
    age: '',
    zodiac: ''
  })
  const [person2, setPerson2] = useState<PersonData>({
    name: '',
    age: '',
    zodiac: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [history, setHistory] = useState<HistoryRecord[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [compatibilityScore, setCompatibilityScore] = useState<number>(0)

  const zodiacSigns = [
    '白羊座', '金牛座', '双子座', '巨蟹座',
    '狮子座', '处女座', '天秤座', '天蝎座',
    '射手座', '摩羯座', '水瓶座', '双鱼座'
  ]

  const calculateCompatibility = () => {
    if (!person1.name || !person2.name || !person1.age || !person2.age || !person1.zodiac || !person2.zodiac) {
      alert('请填写所有信息')
      return
    }

    setIsLoading(true)
    setResult(null)
    setCompatibilityScore(0)

    setTimeout(() => {
      const baseScore = Math.floor(Math.random() * 100)
      const zodiacCompatibility = Math.floor(Math.random() * 20) - 10
      const ageDiff = Math.abs(parseInt(person1.age) - parseInt(person2.age))
      const ageCompatibility = ageDiff < 5 ? 5 : ageDiff < 10 ? 0 : -5

      const finalScore = Math.min(100, Math.max(0, baseScore + zodiacCompatibility + ageCompatibility))
      setCompatibilityScore(finalScore)

      const analysis = [
        `💘 匹配度分析结果 💘\n`,
        `${person1.name} 和 ${person2.name} 的总体契合度为 ${finalScore}%\n`,
        `\n✨ 详细分析：`,
        `\n· 星座相性：${person1.zodiac} 和 ${person2.zodiac} ${zodiacCompatibility > 0 ? '非常合适！' : '需要多一些包容'}`,
        `\n· 年龄差异：${ageDiff}岁 ${ageDiff < 5 ? '(年龄差异适中)' : '(需要克服代沟)'}`,
        '\n\n💝 爱情建议：',
        finalScore >= 90 ? '\n你们是天造地设的一对！珍惜这份难得的缘分。' :
        finalScore >= 80 ? '\n你们非常般配！继续保持甜蜜。' :
        finalScore >= 70 ? '\n有很好的发展空间，要多沟通。' :
        finalScore >= 50 ? '\n需要更多的理解与包容，爱情需要经营。' :
        '\n真爱需要更多的耐心和包容，不要轻易放弃。'
      ].join('')

      setResult(analysis)
      setIsLoading(false)

      const newRecord: HistoryRecord = {
        date: new Date().toLocaleString(),
        person1: {...person1},
        person2: {...person2},
        score: finalScore,
        analysis
      }

      const updatedHistory = [newRecord, ...history].slice(0, 10)
      setHistory(updatedHistory)
      localStorage.setItem('compatibilityHistory', JSON.stringify(updatedHistory))
    }, 1500)
  }

  const shareResult = () => {
    if (result) {
      if (navigator.share) {
        navigator.share({
          title: 'AI恋爱契合度测试结果',
          text: result
        }).catch(console.error)
      } else {
        navigator.clipboard.writeText(result)
        alert('结果已复制到剪贴板！')
      }
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-pink-100 to-purple-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">
          AI 恋爱契合度测试
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* 第一个人的信息 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-600">你的信息</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaUserAlt className="text-purple-500" />
                  姓名
                </label>
                <input
                  type="text"
                  value={person1.name}
                  onChange={(e) => setPerson1({...person1, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaBirthdayCake className="text-purple-500" />
                  年龄
                </label>
                <input
                  type="number"
                  value={person1.age}
                  onChange={(e) => setPerson1({...person1, age: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaStar className="text-purple-500" />
                  星座
                </label>
                <select
                  value={person1.zodiac}
                  onChange={(e) => setPerson1({...person1, zodiac: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="">请选择</option>
                  {zodiacSigns.map(sign => (
                    <option key={sign} value={sign}>{sign}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 第二个人的信息 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-purple-600">对方信息</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaUserAlt className="text-purple-500" />
                  姓名
                </label>
                <input
                  type="text"
                  value={person2.name}
                  onChange={(e) => setPerson2({...person2, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaBirthdayCake className="text-purple-500" />
                  年龄
                </label>
                <input
                  type="number"
                  value={person2.age}
                  onChange={(e) => setPerson2({...person2, age: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FaStar className="text-purple-500" />
                  星座
                </label>
                <select
                  value={person2.zodiac}
                  onChange={(e) => setPerson2({...person2, zodiac: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="">请选择</option>
                  {zodiacSigns.map(sign => (
                    <option key={sign} value={sign}>{sign}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center space-x-4">
          <button 
            onClick={calculateCompatibility}
            disabled={isLoading}
            className={`
              px-8 py-3 rounded-full text-white font-semibold
              ${isLoading ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'}
              transition-all transform hover:scale-105
              flex items-center justify-center gap-2 inline-flex
            `}
          >
            {isLoading ? (
              <>
                <FaHourglass className="animate-spin" />
                分析中...
              </>
            ) : (
              <>
                <FaHeart className="animate-pulse" />
                开始测试
              </>
            )}
          </button>

          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="px-8 py-3 rounded-full text-purple-600 font-semibold border-2 border-purple-600 hover:bg-purple-50 transition-colors inline-flex items-center gap-2"
          >
            <FaHistory />
            {showHistory ? '隐藏历史' : '查看历史'}
          </button>
        </div>

        {result && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-purple-600 flex items-center gap-2">
                <FaHeart className="text-pink-500 animate-bounce" />
                匹配结果
              </h3>
              <button
                onClick={shareResult}
                className="text-purple-600 hover:text-purple-700 flex items-center gap-2 transition-colors"
              >
                <FaShare className="animate-pulse" />
                分享结果
              </button>
            </div>
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-4 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${compatibilityScore}%` }}
                />
              </div>
              <div className="text-center text-lg font-bold text-purple-600">
                {compatibilityScore}% 契合度
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="whitespace-pre-line text-gray-700">
                {result}
              </p>
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              💕 AI匹配分析仅供参考，真爱需要用心经营 💕
            </div>
          </div>
        )}

        {showHistory && history.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-purple-600 flex items-center gap-2">
                <FaHistory />
                历史记录
              </h3>
              <button
                onClick={() => {
                  if (confirm('确定要清除所有历史记录吗？')) {
                    setHistory([])
                    localStorage.removeItem('compatibilityHistory')
                  }
                }}
                className="text-red-600 hover:text-red-700 text-sm flex items-center gap-2"
              >
                <FaTrash />
                清除历史
              </button>
            </div>
            <div className="space-y-4">
              {history.map((record, index) => (
                <div 
                  key={index} 
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-sm text-gray-500 mb-2">{record.date}</div>
                  <div className="text-purple-600 font-semibold flex items-center gap-2">
                    <FaHeart className="text-pink-500" />
                    {record.person1.name} ❤ {record.person2.name}
                  </div>
                  <div className="text-gray-700 text-sm mt-2 flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    契合度: {record.score}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}