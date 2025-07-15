<script setup lang="ts">
import MenuBarDemo from './MenuBarDemo.vue';
import ButtonPrimaryDemo from './ButtonPrimaryDemo.vue';
import ButtonSecondaryDemo from './ButtonSecondaryDemo.vue';
import ButtonBasicDemo from './ButtonBasicDemo.vue';
import IconButtonPrimaryDemo from './IconButtonPrimaryDemo.vue';
import IconButtonBasicDemo from './IconButtonBasicDemo.vue';
import CheckboxDemo from './CheckboxDemo.vue';
import BookmarkedDemo from './BookmarkedDemo.vue';
import CTag from '#/components/CTag.vue';
import CCard from '#/components/CCard.vue';
</script>

# Component Library

## Menu Bar

<MenuBarDemo />

## Button

### Primary

<ButtonPrimaryDemo />

### Secondary

<ButtonSecondaryDemo />

### Basic

<ButtonBasicDemo />

### Icon Button / Primary

<IconButtonPrimaryDemo />

### Icon Button / Basic

<IconButtonBasicDemo />

## Checkbox

<CheckboxDemo />

## Icon / Bookmarked

<BookmarkedDemo />

## Tag

<CTag variant="secondary">Tag</CTag>
<CTag variant="primary">Tag</CTag>
<CTag variant="secondary">Tag</CTag>

## Card

<div style="display: grid; gap: 1em; grid-template-columns: repeat(3, 1fr)">
<CCard
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    startAt="10:00"
    endAt="10:30"
    speaker="zoe steinamp"
    tagText="主議程軌"
/>

<CCard
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    startAt="10:00"
    endAt="10:30"
    speaker="zoe steinamp"
    tagText="主議程軌"
    status="active"
/>

<CCard
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    startAt="10:00"
    endAt="10:30"
    speaker="zoe steinamp"
    tagText="主議程軌"
    status="disabled"
/>

<CCard
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    startAt="10:00"
    endAt="10:30"
    speaker="zoe steinamp"
    tagText="主議程軌"
    status="default"
    bookmarked
/>

<CCard
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    startAt="10:00"
    endAt="10:30"
    speaker="zoe steinamp"
    tagText="主議程軌"
    status="active"
    bookmarked
/>

<CCard
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    startAt="10:00"
    endAt="10:30"
    speaker="zoe steinamp"
    tagText="主議程軌"
    status="disabled"
    bookmarked
/>

</div>

## Card with yScale

<div style="display: grid; gap: 1em; grid-template-columns: repeat(3, 1fr)">

<CCard
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    startAt="10:00"
    endAt="10:30"
    speaker="zoe steinamp"
    tagText="主議程軌"
    :heightFactor="1"
/>

<CCard
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    startAt="10:00"
    endAt="11:00"
    speaker="zoe steinamp"
    tagText="主議程軌"
    :heightFactor="2"
/>

<CCard
    title="A 101 in time series analytics with Apache Arrow, Pandas and Parquet"
    startAt="10:00"
    endAt="11:30"
    speaker="zoe steinamp"
    tagText="主議程軌"
    :heightFactor="3"
/>

</div>
