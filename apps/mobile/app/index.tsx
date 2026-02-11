import { useEffect, useMemo, useState } from 'react';
import { Linking, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { initDb, listJobs, queueMutation, seedDemoJobs } from '../src/offlineDb';

type Job = { id: string; customerName: string; summary: string; status: string };

export default function HomeScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [syncState, setSyncState] = useState<'synced' | 'queued'>('synced');

  useEffect(() => {
    initDb();
    seedDemoJobs();
    setJobs(listJobs());
  }, []);

  const primaryJob = useMemo(() => jobs[0], [jobs]);

  const updateStatus = async () => {
    if (!primaryJob) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    queueMutation('Job', primaryJob.id, 'update', { status: 'enroute' });
    setSyncState('queued');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 28, fontWeight: '800' }}>Today</Text>
        <Text>Offline-first workflow. Local DB is source of truth.</Text>

        {jobs.map((job) => (
          <View key={job.id} style={{ backgroundColor: 'white', padding: 16, borderRadius: 14, gap: 10 }}>
            <Text style={{ fontWeight: '700', fontSize: 18 }}>{job.customerName}</Text>
            <Text>{job.summary}</Text>
            <Text>Status: {job.status}</Text>
            <Pressable style={{ backgroundColor: '#2563eb', padding: 14, borderRadius: 12 }} onPress={updateStatus}>
              <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '700' }}>Set En Route</Text>
            </Pressable>
            <Pressable onPress={() => Linking.openURL('tel:5550101')}>
              <Text style={{ color: '#1d4ed8' }}>Tap to call customer</Text>
            </Pressable>
            <Pressable onPress={() => Linking.openURL('https://maps.google.com/?q=37.7749,-122.4194')}>
              <Text style={{ color: '#1d4ed8' }}>Open Maps</Text>
            </Pressable>
          </View>
        ))}

        <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 14, gap: 8 }}>
          <Text style={{ fontWeight: '700' }}>Sync</Text>
          <Text>{syncState === 'synced' ? 'All changes synced' : 'Sync queued, retrying in background'}</Text>
          <Pressable style={{ borderWidth: 1, borderColor: '#9ca3af', padding: 12, borderRadius: 10 }}>
            <Text style={{ textAlign: 'center' }}>Sync now</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
