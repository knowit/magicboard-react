export const headers = {
  'Accept-Encoding': 'gzip,deflate',
  'Content-Type': 'text/xml;charset=UTF-8',
  SOAPAction:
    'http://services.agresso.com/QueryEngineService/QueryEngineV200606DotNet/GetTemplateResultAsXML',
  Host: 'ubw.unit4cloud.com',
  Connection: 'Keep-Alive',
  'User-Agent': 'Apache-HttpClient/4.1.1 (java 1.5)',
};

export const body =
  '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:quer="http://services.agresso.com/QueryEngineService/QueryEngineV200606DotNet">\n' +
  '    <soapenv:Header/>\n' +
  '    <soapenv:Body>\n' +
  '        <quer:GetTemplateResultAsXML>\n' +
  '            <!--Optional:-->\n' +
  '            <quer:input>\n' +
  '                <quer:TemplateId>2528</quer:TemplateId>\n' +
  '                <!--Optional:-->\n' +
  '                <quer:TemplateResultOptions>\n' +
  '                    <quer:ShowDescriptions>true</quer:ShowDescriptions>\n' +
  '                    <quer:Aggregated>true</quer:Aggregated>\n' +
  '                    <quer:OverrideAggregation>false</quer:OverrideAggregation>\n' +
  '                    <quer:CalculateFormulas>true</quer:CalculateFormulas>\n' +
  '                    <quer:FormatAlternativeBreakColumns>true</quer:FormatAlternativeBreakColumns>\n' +
  '                    <quer:RemoveHiddenColumns>false</quer:RemoveHiddenColumns>\n' +
  '                    <!--Optional:-->\n' +
  '                    <quer:Filter>?</quer:Filter>\n' +
  '                    <quer:FirstRecord>-1</quer:FirstRecord>\n' +
  '                    <quer:LastRecord>-1</quer:LastRecord>\n' +
  '                </quer:TemplateResultOptions>\n' +
  '                <!--Optional:-->\n' +
  '                <quer:SearchCriteriaPropertiesList>\n' +
  '                    <!--Zero or more repetitions:-->\n' +
  '                    <quer:SearchCriteriaProperties>\n' +
  '                        <!--Optional:-->\n' +
  '                        <quer:ColumnName>timecode</quer:ColumnName>\n' +
  '                        <!--Optional:-->\n' +
  '                        <quer:Description>Tidskode</quer:Description>\n' +
  '                        <!--Optional:-->\n' +
  '                        <quer:RestrictionType>!()</quer:RestrictionType>\n' +
  '                        <!--Optional:-->\n' +
  "                        <quer:FromValue>'X9'</quer:FromValue>\n" +
  '                        <!--Optional:-->\n' +
  '                        <quer:ToValue>?</quer:ToValue>\n' +
  '                        <quer:DataType>10</quer:DataType>\n' +
  '                        <quer:DataLength>25</quer:DataLength>\n' +
  '                        <quer:DataCase>2</quer:DataCase>\n' +
  '                        <quer:IsParameter>true</quer:IsParameter>\n' +
  '                        <quer:IsVisible>false</quer:IsVisible>\n' +
  '                        <quer:IsPrompt>false</quer:IsPrompt>\n' +
  '                        <!--Optional:-->\n' +
  '                        <quer:RelDateCrit>?</quer:RelDateCrit>\n' +
  '                    </quer:SearchCriteriaProperties>\n' +
  '                </quer:SearchCriteriaPropertiesList>\n' +
  '                <!--Optional:-->\n' +
  '                <quer:PipelineAssociatedName>?</quer:PipelineAssociatedName>\n' +
  '            </quer:input>\n' +
  '            <!--Optional:-->\n' +
  '            <quer:credentials>\n' +
  '                <!--Optional:-->\n' +
  '                <quer:Username>wsobjectnet</quer:Username>\n' +
  '                <!--Optional:-->\n' +
  '                <quer:Client>320</quer:Client>\n' +
  '                <!--Optional:-->\n' +
  '                <quer:Password>Magicboard123</quer:Password>\n' +
  '                <!--Optional:-->\n' +
  '                <quer:AccessToken>?</quer:AccessToken>\n' +
  '            </quer:credentials>\n' +
  '        </quer:GetTemplateResultAsXML>\n' +
  '    </soapenv:Body>\n' +
  '</soapenv:Envelope>';
