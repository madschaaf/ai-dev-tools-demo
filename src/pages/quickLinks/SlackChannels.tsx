import { useState } from 'react'

interface Channel {
  name: string
  purpose: string
  joinUrl: string
}

interface SlackChannelsProps {
  channels: Channel[]
}

export default function SlackChannels({ channels }: SlackChannelsProps) {
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null)

  const handleCopyChannel = (channel: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(channel).then(() => setCopiedChannel(channel))
    } else {
      setCopiedChannel(channel)
    }
    setTimeout(() => setCopiedChannel(null), 1500)
  }

  return (
    <>
      <h2>Join the Slack channels</h2>
      <p>Click Add to open Slack, then paste the channel name if prompted.</p>

      <div className="channel-list">
        {channels.map((chan) => (
          <div key={chan.name} className="channel-card">
            <div className="channel-meta">
              <div className="channel-name">{chan.name}</div>
              <div className="muted small">{chan.purpose}</div>
            </div>
            <div className="channel-actions">
              <a className="button ghost" href={chan.joinUrl} target="_blank" rel="noreferrer">
                Add in Slack
              </a>
              <button className="button secondary" onClick={() => handleCopyChannel(chan.name)}>
                Copy name
              </button>
              {copiedChannel === chan.name && <span className="copy-pill">Copied</span>}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
