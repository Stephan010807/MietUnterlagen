import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import type { PDFDocumentProps } from '@/types/pdf';
import { pdfStyles } from '@/lib/pdf/pdf-styles';
import { formatDate } from '@/lib/utils';

export function SelbstauskunftPDF({ data }: PDFDocumentProps) {
  const today = new Date();
  const formattedToday = formatDate(today);

  const getEmploymentStatusText = (status?: string) => {
    switch (status) {
      case 'employed':
        return 'Angestellt';
      case 'self-employed':
        return 'Selbstständig / Freiberufler';
      case 'student':
        return 'Student/in';
      case 'unemployed':
        return 'Arbeitssuchend';
      case 'retired':
        return 'Rentner/in';
      default:
        return '-';
    }
  };

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        {/* Header */}
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.title}>Mieter-Selbstauskunft</Text>
          <Text style={pdfStyles.subtitle}>
            Erstellt am {formattedToday}
          </Text>
        </View>

        {/* Personal Information */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Persönliche Angaben</Text>

          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Name:</Text>
            <Text style={pdfStyles.value}>
              {data.firstName} {data.lastName}
            </Text>
          </View>

          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Geburtsdatum:</Text>
            <Text style={pdfStyles.value}>
              {data.birthDate ? formatDate(data.birthDate) : '-'}
            </Text>
          </View>

          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Geburtsort:</Text>
            <Text style={pdfStyles.value}>{data.birthPlace || '-'}</Text>
          </View>

          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Aktuelle Anschrift:</Text>
            <Text style={pdfStyles.value}>
              {data.currentAddress?.street} {data.currentAddress?.houseNumber},{' '}
              {data.currentAddress?.zipCode} {data.currentAddress?.city}
            </Text>
          </View>

          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Telefon:</Text>
            <Text style={pdfStyles.value}>{data.phone || '-'}</Text>
          </View>

          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>E-Mail:</Text>
            <Text style={pdfStyles.value}>{data.email || '-'}</Text>
          </View>
        </View>

        {/* Employment */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Beschäftigung & Einkommen</Text>

          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Beschäftigungsstatus:</Text>
            <Text style={pdfStyles.value}>
              {getEmploymentStatusText(data.employmentStatus)}
            </Text>
          </View>

          {data.employer && (
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>
                {data.employmentStatus === 'self-employed'
                  ? 'Unternehmen:'
                  : 'Arbeitgeber:'}
              </Text>
              <Text style={pdfStyles.value}>{data.employer}</Text>
            </View>
          )}

          {data.position && (
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Position:</Text>
              <Text style={pdfStyles.value}>{data.position}</Text>
            </View>
          )}

          {data.employedSince && (
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>
                {data.employmentStatus === 'self-employed'
                  ? 'Selbstständig seit:'
                  : 'Beschäftigt seit:'}
              </Text>
              <Text style={pdfStyles.value}>{data.employedSince}</Text>
            </View>
          )}

          {data.university && (
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Universität/Hochschule:</Text>
              <Text style={pdfStyles.value}>{data.university}</Text>
            </View>
          )}

          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Monatliches Nettoeinkommen:</Text>
            <Text style={pdfStyles.value}>
              {data.monthlyNetIncome ? `${data.monthlyNetIncome} €` : '-'}
            </Text>
          </View>

          {data.additionalIncome && (
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Zusätzliche Einkommen:</Text>
              <Text style={pdfStyles.value}>{data.additionalIncome} €</Text>
            </View>
          )}
        </View>

        {/* Household */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Haushalt</Text>

          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Anzahl Personen:</Text>
            <Text style={pdfStyles.value}>
              {data.householdSize || 1}{' '}
              {data.householdSize === 1 ? 'Person' : 'Personen'}
            </Text>
          </View>

          {data.moveInDate && (
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Gewünschter Einzugstermin:</Text>
              <Text style={pdfStyles.value}>
                {formatDate(data.moveInDate)}
              </Text>
            </View>
          )}

          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Haustiere:</Text>
            <Text style={pdfStyles.value}>
              {data.hasPets ? 'Ja' : 'Nein'}
            </Text>
          </View>

          {data.hasPets && data.petDetails && (
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Details zu Haustieren:</Text>
              <Text style={pdfStyles.value}>{data.petDetails}</Text>
            </View>
          )}
        </View>

        {/* Financial */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Finanzielle Situation</Text>

          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>SCHUFA-Auskunft:</Text>
            <Text style={pdfStyles.value}>
              {data.hasSchufa ? 'Kann vorgelegt werden' : 'Nicht verfügbar'}
            </Text>
          </View>

          {data.hasSchufa && data.schufaScore && (
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>SCHUFA-Score:</Text>
              <Text style={pdfStyles.value}>{data.schufaScore}%</Text>
            </View>
          )}

          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Mietrückstände:</Text>
            <Text style={pdfStyles.value}>
              {data.hasRentalArrears ? 'Ja' : 'Nein'}
            </Text>
          </View>

          {data.hasRentalArrears && data.rentalArrearsDetails && (
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Erläuterung:</Text>
              <Text style={pdfStyles.value}>{data.rentalArrearsDetails}</Text>
            </View>
          )}
        </View>

        {/* Additional Information */}
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Weitere Angaben</Text>

          <View style={pdfStyles.row}>
            <Text style={pdfStyles.label}>Raucher:</Text>
            <Text style={pdfStyles.value}>
              {data.isSmoker ? 'Ja' : 'Nein'}
            </Text>
          </View>

          {data.previousLandlord?.name && (
            <>
              <View style={pdfStyles.row}>
                <Text style={pdfStyles.label}>Vorvermieter:</Text>
                <Text style={pdfStyles.value}>{data.previousLandlord.name}</Text>
              </View>
              {data.previousLandlord.phone && (
                <View style={pdfStyles.row}>
                  <Text style={pdfStyles.label}>Telefon Vorvermieter:</Text>
                  <Text style={pdfStyles.value}>
                    {data.previousLandlord.phone}
                  </Text>
                </View>
              )}
            </>
          )}

          {data.messageToLandlord && (
            <View style={{ marginTop: 10 }}>
              <Text style={pdfStyles.label}>Nachricht an den Vermieter:</Text>
              <Text style={{ ...pdfStyles.value, marginTop: 5 }}>
                {data.messageToLandlord}
              </Text>
            </View>
          )}
        </View>

        {/* Attachment Checklist */}
        <View style={pdfStyles.attachmentChecklist}>
          <Text style={pdfStyles.attachmentTitle}>
            Empfohlene Anlagen (bitte beifügen):
          </Text>
          <View style={pdfStyles.attachmentItem}>
            <View style={pdfStyles.checkbox} />
            <Text style={pdfStyles.attachmentText}>
              Kopie Personalausweis oder Reisepass
            </Text>
          </View>
          <View style={pdfStyles.attachmentItem}>
            <View style={pdfStyles.checkbox} />
            <Text style={pdfStyles.attachmentText}>
              Gehaltsnachweise der letzten 3 Monate
            </Text>
          </View>
          {data.hasSchufa && (
            <View style={pdfStyles.attachmentItem}>
              <View style={pdfStyles.checkbox} />
              <Text style={pdfStyles.attachmentText}>SCHUFA-Auskunft</Text>
            </View>
          )}
          <View style={pdfStyles.attachmentItem}>
            <View style={pdfStyles.checkbox} />
            <Text style={pdfStyles.attachmentText}>
              Mietschuldenfreiheitsbescheinigung
            </Text>
          </View>
        </View>

        {/* Declaration */}
        <View style={{ marginTop: 30 }}>
          <Text style={{ fontSize: 9, color: '#64748b', marginBottom: 10 }}>
            Ich versichere, dass alle Angaben in dieser Selbstauskunft
            wahrheitsgemäß und vollständig sind. Mir ist bekannt, dass falsche
            Angaben zur Ablehnung meiner Bewerbung oder zur Kündigung des
            Mietverhältnisses führen können.
          </Text>

          <View style={{ marginTop: 30, flexDirection: 'row', gap: 40 }}>
            <View>
              <View style={pdfStyles.signatureLine} />
              <Text style={pdfStyles.signatureLabel}>
                Ort, Datum
              </Text>
            </View>
            <View>
              <View style={pdfStyles.signatureLine} />
              <Text style={pdfStyles.signatureLabel}>
                Unterschrift Mieter/in
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={pdfStyles.footer}>
          <Text style={pdfStyles.footerText}>
            Erstellt mit Mietunterlagen.de
          </Text>
          <Text style={pdfStyles.footerText}>
            Datenschutzhinweis: Diese Selbstauskunft dient ausschließlich der
            Wohnungsbewerbung.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
