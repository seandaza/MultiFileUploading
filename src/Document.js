import { Button, Formatters, Icon } from '@keoworld/gbl-ui-kit'
import styled, { css } from 'styled-components'
const kilobyteConverter = (kilobytes, to = 'MB') => {
  const units = {
    MB: 1000,
    GB: 10000
  }
  return kilobytes / units[to]
}
/**
 * @param {DocumentType} props
 * @returns
 */
const Document = (props) => {
  const {
    allowedDocumentTypes,
    allowUpload,
    className,
    documentName,
    isDisabled,
    file,
    label,
    onChange,
    onClickDelete,
    onClickDownload,
    onClickComment
  } = props
  const uploadFile = () => window.document.getElementById(documentName).click()
  const onHandleChange = (event) => {
    const files = event.target.files
    if (files && onChange) onChange(files)
  }
  return (
    <DocumentStyled className={className} isThereFile={Boolean(file)}>
      <div className='icon-group'>
        {typeof onClickDownload === 'function' && (
          <button onClick={onClickDownload}>
            <Icon name='file_download' type='outlined' />
          </button>
        )}
        {typeof onClickComment === 'function' && (
          <button onClick={onClickComment}>
            <Icon name='add_comment' type='outlined' />
          </button>
        )}
        {typeof onClickDelete === 'function' && (
          <button onClick={onClickDelete}>
            <Icon name='delete' type='outlined' />
          </button>
        )}
      </div>
      <div>
        <div className='document-label'>{label}</div>
        {file && (
          <div className='document'>
            <div className='file-name'>
              <Icon name='attach_file' />
              <span>{file.name}</span>
            </div>
            <div className='file-size'>
              {Formatters.numberFormat(
                kilobyteConverter(file.size, 'MB'),
                'es-MX',
                {
                  maximumFractionDigits: 2
                }
              )}{' '}
              MB
            </div>
          </div>
        )}
      </div>
      <input
        id={documentName}
        name={documentName}
        accept={allowedDocumentTypes}
        filename={file?.name}
        onChange={onHandleChange}
        type='file'
        hidden
      />
      {allowUpload && !file && (
        <Button disabled={isDisabled} onClick={uploadFile}>
          Subir documento
        </Button>
      )}
    </DocumentStyled>
  )
}
const DocumentStyled = styled.div`
  margin-top: 0.5rem;
  padding: 10px;
  min-height: 50px;
  border: 1px solid
    ${({ theme }) => theme.colors.grayShades[300].backgroundColor};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    height: 25px;
  }
  .icon-group {
    display: none;
  }
  ${({ isThereFile }) => {
    if (isThereFile) {
 return css`
        position: relative;
        height: 100px;
        padding: 2rem;
        .document {
          .file-name {
            display: flex;
            align-items: center;
            font-size: 10pt;
            .icon {
              font-size: 20px;
            }
          }
          .file-size {
            margin-left: 20px;
            opacity: 30%;
            font-size: 8pt;
          }
        }
        .icon-group {
          display: block;
          position: absolute;
          top: 5px;
          right: 1.5rem;
          button {
            cursor: pointer;
            border: none;
            background-color: transparent;
            height: 30px;
            width: 40px;
            .icon {
              font-size: 20px;
            }
          }
        }
      `
}
  }}
`
export default Document
/**
 * @typedef DocumentType
 * @property {string} allowedDocumentTypes
 * @property {boolean} allowUpload
 * @property {string} className
 * @property {string} documentName
 * @property {boolean} isDisabled
 * @property {FileObject} file
 * @property {string} label
 * @property {Function} onChange
 * @property {Function} onClickDelete
 * @property {Function} onClickDownload
 * @property {Function} onClickComment
 */
/**
 * @typedef FileObject
 * @property {string} name
 * @property {number} size
 */