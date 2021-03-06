import { DocNode, DocNodeKind, IDocNodeParameters } from './DocNode';
import { DocHtmlAttribute } from './DocHtmlAttribute';

/**
 * Constructor parameters for {@link DocHtmlStartTag}.
 */
export interface IDocHtmlStartTagParameters extends IDocNodeParameters {
  elementName: string;
  spacingAfterElementName?: string;
  htmlAttributes: DocHtmlAttribute[];
  selfClosingTag: boolean;
}

/**
 * Represents an HTML start tag, which may or may not be self-closing.
 *
 * Example: `<a href="#" />`
 */
export class DocHtmlStartTag extends DocNode {
  /** {@inheritdoc} */
  public readonly kind: DocNodeKind = DocNodeKind.HtmlStartTag;

  /**
   * The HTML element name.
   */
  public readonly elementName: string;

  /**
   * Explicit whitespace that a renderer should insert after the HTML element name.
   * If undefined, then the renderer can use a formatting rule to generate appropriate spacing.
   */
  public readonly spacingAfterElementName: string | undefined;

  /**
   * If true, then the HTML tag ends with "/>" instead of ">".
   */
  public readonly selfClosingTag: boolean;

  private _htmlAttributes: DocHtmlAttribute[];

  /**
   * Don't call this directly.  Instead use {@link TSDocParser}
   * @internal
   */
  public constructor(parameters: IDocHtmlStartTagParameters) {
    super(parameters);
    this.elementName = parameters.elementName;
    DocNode.validateSpacing(parameters.spacingAfterElementName, 'spacingAfterElementName');
    this.spacingAfterElementName = parameters.spacingAfterElementName;
    this._htmlAttributes = parameters.htmlAttributes;
    this.selfClosingTag = parameters.selfClosingTag;
  }

  /**
   * The HTML attributes belonging to this HTML element.
   */
  public get htmlAttributes(): ReadonlyArray<DocHtmlAttribute> {
    return this._htmlAttributes;
  }

  /**
   * {@inheritdoc}
   * @override
   */
  public getChildNodes(): ReadonlyArray<DocNode> {
    return this._htmlAttributes;
  }
}
