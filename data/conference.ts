/**
 * Conference data
 *
 * This is where you can define shared data specific to the current conference.
 *
 * @example
 * <script setup lang="ts">
 * import { conference } from '#data/conference'
 *
 * const start = conference.startDate.toLocaleDateString()
 * const end = conference.endDate.toLocaleDateString()
 * </script>
 *
 * Conference date: {{ start }} ~ {{ end }}
 */
export const conference = {
  title: 'COSCUP x RubyConf Taiwan 2025',
  description: 'Conference for Open Source Coders, Users, and Promoters is a free annual conference providing a platform to connect FLOSS folks across Asia since 2006. It\'s a major force of free software movement advocacy in Taiwan.',
  year: 2025,
  startDate: new Date('2025-08-09'),
  endDate: new Date('2025-08-10'),
  type: 'website',
  url: 'https://coscup.org/2025/',
  site_name: 'COSCUP x RubyConf Taiwan 2025',
  og_image: '/2025/og-image.png',
  favicon: '/2025/favicon.svg',
}
