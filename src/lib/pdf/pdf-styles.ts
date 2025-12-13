import { StyleSheet } from '@react-pdf/renderer';

export const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 30,
    paddingBottom: 15,
    borderBottom: '2 solid #0284c7',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: '#0c4a6e',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 10,
    color: '#64748b',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#0c4a6e',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: '1 solid #e2e8f0',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    width: '40%',
    fontSize: 10,
    color: '#64748b',
  },
  value: {
    width: '60%',
    fontSize: 10,
    color: '#1e293b',
    fontFamily: 'Helvetica-Bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    paddingTop: 15,
    borderTop: '1 solid #e2e8f0',
  },
  footerText: {
    fontSize: 9,
    color: '#94a3b8',
    marginBottom: 5,
  },
  signatureLine: {
    marginTop: 40,
    borderTop: '1 solid #1e293b',
    width: 200,
  },
  signatureLabel: {
    marginTop: 5,
    fontSize: 9,
    color: '#64748b',
  },
  checkbox: {
    width: 12,
    height: 12,
    border: '1 solid #64748b',
    marginRight: 8,
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    border: '1 solid #0284c7',
    backgroundColor: '#0284c7',
    marginRight: 8,
  },
  note: {
    backgroundColor: '#f0f9ff',
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
    fontSize: 9,
    color: '#0c4a6e',
  },
  attachmentChecklist: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f8fafc',
    borderRadius: 4,
  },
  attachmentTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  attachmentText: {
    fontSize: 9,
    color: '#475569',
  },
});
