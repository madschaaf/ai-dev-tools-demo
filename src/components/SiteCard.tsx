type Props = {
  title: string
  description?: string
  accent?: string
}

export default function SiteCard({ title, description, accent }: Props) {
  return (
    <div className="card" style={{ borderColor: accent }}>
      <div className="card-header">{title}</div>
      {description && <div className="card-body">{description}</div>}
      <div className="card-cta">Learn how we use {title} →</div>
    </div>
  )
}
