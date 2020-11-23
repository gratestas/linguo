import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Col, Form, Input, Row, Typography, message } from 'antd';
import { InputNumberWithAddons } from '~/adapters/antd';
import DismissableAlert from '~/features/ui/DismissableAlert';
import SingleFileUpload, { validator as singleFileUploadValidator } from '~/shared/SingleFileUpload';

export default function OriginalSourceFields({ setFieldsValue }) {
  const handleOriginalTextFileChange = React.useCallback(
    ({ fileList }) => {
      setFieldsValue({ originalTextFile: [...fileList] });
    },
    [setFieldsValue]
  );

  return (
    <Col span={24}>
      <Row gutter={[16, 16]}>
        <Col
          span={24}
          css={`
            margin: -0.5rem 0 1rem;

            :empty {
              display: none;
            }
          `}
        >
          <DismissableAlert
            id="requester.form.multipleFiles"
            message="If you want to send multiple files, you can put them all in a single .zip file."
            description={
              <StyledDisclaimer>
                <p>Please make sure the actual files to be translated can be easily identified.</p>
                <p>
                  We recommend you to include a file in a simple format (i.e.: <em>instructions.pdf</em>) with general
                  instructions for translators.
                </p>
              </StyledDisclaimer>
            }
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={16}>
          <StyledFormItem
            label="Original File"
            name="originalTextFile"
            valuePropName="fileList"
            getValueFromEvent={normalizeFile}
            extra="Single file up to 100 MB"
            rules={[
              {
                required: true,
                message: 'Please provide the original file.',
              },
              {
                validator: uploadValidator,
              },
            ]}
          >
            <SingleFileUpload
              fullWidth
              beforeUpload={beforeUpload}
              onChange={handleOriginalTextFileChange}
              buttonProps={{
                variant: 'outlined',
              }}
            />
          </StyledFormItem>
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <StyledFormItem
            label="Word Count"
            name="wordCount"
            rules={[
              {
                required: true,
                message: 'Please set the word count.',
              },
            ]}
          >
            <InputNumberWithAddons
              type="number"
              placeholder="The length of the content"
              min={1}
              step={1}
              addonAfter="words"
            />
          </StyledFormItem>
        </Col>
        <Col xs={24} sm={24} md={24} lg={16}>
          <StyledFormItem
            label="Original URL (optional)"
            name="originalTextUrl"
            rules={[
              {
                required: false,
                type: 'url',
                message: 'Please provide a valid URL.',
              },
            ]}
          >
            <Input size="large" placeholder="Insert a URL here" />
          </StyledFormItem>
        </Col>
      </Row>
    </Col>
  );
}

OriginalSourceFields.propTypes = {
  setFieldsValue: t.func.isRequired,
};

const normalizeFile = e => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const beforeUpload = file => {
  // do something...
  const isLt100M = file.size / 1024 / 1024 < 100;

  if (!isLt100M) {
    message.error('File must smaller than 100 MB!');
  }

  return isLt100M;
};

async function uploadValidator(rule, value) {
  if (!value || value.length === 0) {
    return '';
  }

  return singleFileUploadValidator(value);
}

const StyledFormItem = styled(Form.Item)``;

const StyledDisclaimer = styled(Typography.Paragraph)`
  && {
    color: ${p => p.theme.color.text.light};

    > p {
      margin: 0;
    }
  }
`;
