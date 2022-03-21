import { LitElement, html, CSSResult, TemplateResult } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { styles } from './styles'
import { property } from 'lit/decorators/property.js'
import { variantClassMap } from 'src/variantMap'

export type LinkVariants = 'default' | 'success' | 'neutral' | 'warning' | 'danger'

/**
 * A link component
 *
 * @slot - Default slot
 *
 * @csspart base - Link that wraps everything
 */
export class KpcLink extends LitElement {
  @property({ reflect: true, type: String }) href?: string
  @property({ reflect: true, type: String }) rel: string = ''
  @property({ reflect: true, type: String }) target?: string
  @property({ reflect: true, type: String }) variant: LinkVariants = 'default'

  @property({ type: Boolean }) external: boolean = false

  static get variants (): LinkVariants[] {
    return ['default', 'success', 'neutral', 'warning', 'danger']
  }

  static get styles (): CSSResult {
    return styles
  }

  get externalRel (): string {
    return this.external ? `${this.rel} nofollow noopener noreferrer` : this.rel
  }

  render (): TemplateResult {
    return html`
      <a
        part="base"
        href="${this.href}"
        class="${variantClassMap("link", this.variant, KpcLink.variants)}"
        rel=${ifDefined(this.externalRel)}
        target=${ifDefined(this.target)}>
        <slot></slot>
      </a>
    `
  }
}
