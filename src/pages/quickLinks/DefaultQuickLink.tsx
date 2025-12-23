
interface LinkInfo {
  title: string
  details: string
  tips?: string[]
  extraLink?: {
    text: string
    url: string
  }
}

interface DefaultQuickLinkProps {
  url: string
  name: string
  info: LinkInfo
  hideMainButton?: boolean
}

export default function DefaultQuickLink({ url, name, info, hideMainButton }: DefaultQuickLinkProps) {
  return (
    <>
      <h2>{info.title}</h2>
      <p>{info.details}</p>

      {info.tips && info.tips.length > 0 && (
        <ul style={{ paddingLeft: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
          {info.tips.map((tip, idx) => (
            <li key={idx} style={{ marginBottom: 'var(--space-1)' }}>
              {tip}
            </li>
          ))}
        </ul>
      )}

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginTop: 'var(--space-4)' }}>
        {!hideMainButton && (
          <a className="button" href={url} target="_blank" rel="noreferrer">
            Open {name}
          </a>
        )}
        {info.extraLink && (
          <a className="button ghost" href={info.extraLink.url} target="_blank" rel="noreferrer">
            {info.extraLink.text}
          </a>
        )}
      </div>
    </>
  )
}
