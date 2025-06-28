import '../style-modules/loading.css'

type Props = {}

function DashBoardLoading({}: Props) {
  return (
    <div id="sidebar_loading">
    <div className="loading-group">
      <div className="loading-header"></div>
      <div className="loading"></div>
    </div>
    <div className="loading-group">
      <div className="loading-header"></div>
      <div className="loading"></div>
    </div>
    <div className="loading-group">
      <div className="loading-header"></div>
      <div className="loading"></div>
      <div className="loading"></div>
      <div className="loading"></div>
      <div className="loading"></div>
      <div className="loading"></div>
    </div>
  </div>
  )
}

export default DashBoardLoading